package mypackage;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import biweekly.Biweekly;
import biweekly.ICalendar;

public class Main {
	private static Firestore db;
	
	public static void main(String[] args) {
		
		while (db==null) {
			try {
				db = FirebaseClients.initFirebase();
			} catch(ClassNotFoundException e) {
				e.printStackTrace();
			} catch (FileNotFoundException e) {
				System.out.println("Private key not found");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		while (true) {
			DocumentReference docRef = db.collection("algo").document("algoStatus");
			ApiFuture<DocumentSnapshot> futureRead = docRef.get();
			try {
				DocumentSnapshot document = futureRead.get();
				System.out.println("Waiting for signal");
				if (document.exists()) {
					if (document.getString("status").equals("generate")) {
						ApiFuture<WriteResult> futureWriteStart = docRef.update("status", "generating");
						System.out.println("Generating");
						start();
						ApiFuture<WriteResult> futureWriteEnd = docRef.update("status", "ready");
						System.out.println("Completed generating!");
					} else {
						Thread.sleep(3000);
					}
				} else {
					System.out.println("No such document!");
					Thread.sleep(5000);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	private static void start() {
		List<Course> courseList = generateCourses(db);
		List<Room> roomList = generateRooms(db);
		List<Professor> profList = generateProfessors(db);
		List<Lecture> lectureList = generateLectures(courseList, db);	
		
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		Solver<CourseSchedule> solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule(lectureList, roomList, profList);
		CourseSchedule solvedCourseSchedule;
		while (true) {
			solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
			System.out.println(solvedCourseSchedule.getScore());
			System.out.println(solvedCourseSchedule.getScore().getHardScore());
			if (solvedCourseSchedule.getScore().getHardScore() == 0)
				break;
		}
		ArrayList<Lecture> solvedLectureList = (ArrayList<Lecture>) solvedCourseSchedule.getLectureList();
		HashSet<Professor> solvedProfSet = new HashSet<Professor>(); 
		
		for (Lecture lecture: solvedLectureList) {
//			// Print stuff
			System.out.println(lecture.getLectureId() + " Room: " + lecture.getRoom().getRoomName() + " Day: " + lecture.timeslot.getDaySlot() + 
					" Start Time: " + lecture.timeslot.getStartTime() + " End Time: " + lecture.timeslot.getEndTime() + 
					" Lecturer: " + lecture.getProfessor().getInstructorName());
			lecture.giveProfLecture();
			solvedProfSet.add(lecture.getProfessor());
		}
		
		for (Professor prof: solvedProfSet) {
			System.out.println(prof.getInstructorName());
			
			//asynchronously retrieve all documents
			ApiFuture<QuerySnapshot> oldLectures = db.collection("instructors").document(prof.getInstructorName()).
					collection("lectures").get();
			try {
				List<QueryDocumentSnapshot> documents = oldLectures.get().getDocuments();
				for (QueryDocumentSnapshot document : documents) {
					ApiFuture<WriteResult> deleteOldLectures = db.collection("instructors").document(prof.getInstructorName()).
							collection("lectures").document(document.getId()).delete();
				}
			} catch (ExecutionException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			}

			for (Lecture lecture: prof.getLectureList()) {
				FirestoreLecture firestoreLecture = new FirestoreLecture(lecture);
				ApiFuture<DocumentReference> newLectures = db.collection("instructors").document(prof.getInstructorName()).
						  collection("lectures").add(firestoreLecture);
			}
		}
		
		for (Professor prof: solvedProfSet) {
			CalManager calMan = new CalManager();
			ICalendar ical = calMan.createCalendar(prof);
			String fileName = "./" + prof.getInstructorName() + ".ics";
			File file = new File(fileName);
			try {
				Biweekly.write(ical).go(file);
			} catch (Exception e) {
				e.printStackTrace();
			}
			Storage storage = StorageOptions.getDefaultInstance().getService();
			BlobId blobId = BlobId.of("escproject", prof.getInstructorName());
			BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/calendar").build();
			FileInputStream input = null;
			try {
				input = new FileInputStream(fileName);
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			Blob blob = storage.create(blobInfo, input);
		}
	}
	
	public static List<Course> generateCourses(Firestore db) {
		List<Course> courseList = new ArrayList<Course>();
		//asynchronously retrieve all documents
		ApiFuture<QuerySnapshot> future = db.collection("courses").get();
		// future.get() blocks on response
		try {
			List<QueryDocumentSnapshot> documents = future.get().getDocuments();
			for (QueryDocumentSnapshot document : documents) {
				Course tempCourse = document.toObject(Course.class);
				System.out.println(document.getId() + " => " + tempCourse.getCourseName());
				if (tempCourse != null) {
					courseList.add(tempCourse);
				}
			}
			return courseList;
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static List<Room> generateRooms(Firestore db) {
		List<Room> roomList = new ArrayList<Room>();
		//asynchronously retrieve all documents
		ApiFuture<QuerySnapshot> future = db.collection("rooms").get();
		// future.get() blocks on response
		try {
			List<QueryDocumentSnapshot> documents = future.get().getDocuments();
			for (QueryDocumentSnapshot document : documents) {
				Room tempRoom = document.toObject(Room.class);
				System.out.println(document.getId() + " => " + tempRoom.getRoomName());
				if (tempRoom != null) {
					roomList.add(tempRoom);
				}
			}
			return roomList;
		} catch (ExecutionException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static List<Professor> generateProfessors(Firestore db) {
		List<Professor> professorList = new ArrayList<Professor>();
		//asynchronously retrieve all documents
				ApiFuture<QuerySnapshot> future = db.collection("instructors").get();
				// future.get() blocks on response
				try {
					List<QueryDocumentSnapshot> documents = future.get().getDocuments();
					for (QueryDocumentSnapshot document : documents) {
						Professor tempProfessor = document.toObject(Professor.class);
						System.out.println(document.getId() + " => " + tempProfessor.getInstructorName());
						if (tempProfessor != null) {
							professorList.add(tempProfessor);
						}
					}
					return professorList;
				} catch (ExecutionException e) {
					e.printStackTrace();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
		return null;
	}
	
	public static List<Lecture> generateLectures(List<Course> courseList, Firestore db) {
		List<Lecture> lectureList = new ArrayList<Lecture>();
		for (Course course: courseList) {
//			course.initLectureArray();
			for (int lectureIndex: course.getLectureIndexList()) {
				String tempLectureId = course.getCourseId() + "_-1_" + lectureIndex;
				Lecture tempLec = new Lecture(tempLectureId, course.getClassPeriodList().get(lectureIndex), course);
				tempLec.setClassNumber(String.valueOf(lectureIndex));
				tempLec.setCohortNumber(String.valueOf(-1));
				lectureList.add(tempLec);
			}
			for (int cohort = 0; cohort < course.getNumberOfCohorts(); cohort++) {
				for (int numClass = 0; numClass < course.getNumberOfClasses(); numClass++) {
					if (course.getLectureIndexList().contains(numClass))
						continue;
					String tempLectureId = course.getCourseId() + "_" + cohort + "_" + numClass;
					Lecture tempLec = new Lecture(tempLectureId, course.getClassPeriodList().get(numClass), course);
					tempLec.setClassNumber(String.valueOf(numClass));
					tempLec.setCohortNumber(String.valueOf(cohort));
					lectureList.add(tempLec);
//					course.getLectureArray()[cohort * numClass] = lectureList.get(lectureList.size()-1);
				}
			}
		}
		return lectureList;
	}
}
