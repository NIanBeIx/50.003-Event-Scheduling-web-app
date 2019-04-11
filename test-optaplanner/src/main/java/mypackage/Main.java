package mypackage;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;

import com.google.api.client.util.Sleeper;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;

public class Main {
	private static Firestore db;
	final static int NUMSCHEDULES = 3;
	
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
		List<Course> courseList = generateCourses();
		List<Room> roomList = generateRooms();
		List<Professor> profList = generateProfessors();
		List<Lecture> lectureList = generateLectures(courseList);		
		
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		Solver<CourseSchedule> solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule(lectureList, roomList, profList);
		CourseSchedule solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
		System.out.println(solvedCourseSchedule.getScore());
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
	}
	
	private static List<Course> generateCourses() {
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
	
	private static List<Room> generateRooms() {
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
	
	private static List<Professor> generateProfessors() {
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
	
	private static List<Lecture> generateLectures(List<Course> courseList) {
		List<Lecture> lectureList = new ArrayList<Lecture>();
		for (Course course: courseList) {
			course.initLectureArray();
			for (int cohort = 0; cohort < course.getNumberOfCohorts(); cohort++) {
				for (int numClass = 0; numClass < course.getNumberOfClasses(); numClass++) {
					String tempLectureId = course.getCourseId() + "_" + cohort + "_" + numClass;
					Lecture tempLec = new Lecture(tempLectureId, course.getClassPeriodList().get(numClass), course);
					tempLec.setClassNumber(String.valueOf(numClass));
					tempLec.setCohortNumber(String.valueOf(cohort));
					lectureList.add(tempLec);
					course.getLectureArray()[cohort * numClass] = lectureList.get(lectureList.size()-1);
				}
			}
		}
		return lectureList;
	}
}

class SolverThread extends Thread {
	CourseSchedule unsolvedCourseSchedule;
	CourseSchedule solvedCourseSchedule;
	
	public SolverThread(CourseSchedule unsolvedCourseSchedule) {
		this.unsolvedCourseSchedule = unsolvedCourseSchedule;
	}
	
	public void run() {
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		Solver<CourseSchedule> solver = solverFactory.buildSolver();
		solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
	}
	
	public CourseSchedule getSolvedCourseSchedule() {
		return this.solvedCourseSchedule;
	}
}
