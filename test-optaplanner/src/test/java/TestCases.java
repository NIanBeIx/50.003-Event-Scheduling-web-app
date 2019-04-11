import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;
import org.optaplanner.core.config.solver.termination.TerminationConfig;

import mypackage.Course;
import mypackage.CourseSchedule;
import mypackage.Lecture;
import mypackage.Professor;
import mypackage.Room;

public class TestCases {
	Solver<CourseSchedule> solver;
	ArrayList<Lecture> lectureList;
	ArrayList<Lecture> solvedLectureList;
	CourseSchedule solvedCourseSchedule;
	
	
	@Before
	public void beforeStandardTests() {
		initiate(10, 10, 20, (long) 0.05);
	}
	
	@Test
	public void checkNumLectures() {
		/*
		 * The number of lectures in the solved lecture list should be equal to the initial number of lectures we started with
		 */
		assert(solvedLectureList.size() == lectureList.size());
	}
	
	@Test
	public void checkNoRepeatingLectures() {
		/* 
		 * Each lecture id should be unique
		 */
		Set<String> tempSet = new HashSet<String>();
		for (Lecture lecture: solvedLectureList) {
			if (tempSet.contains(lecture.getLectureId())) {
				assertFalse(true);
			} else {
				tempSet.add(lecture.getLectureId());
			}
		}
		assertTrue(true);
	}
	
	@Test
	public void checkProfessors1() {
		ArrayList<Professor> profList = createProfessors(0);
		assertEquals(0, profList.size());
	}
	
	@Test
	public void checkProfessors2() {
		ArrayList<Professor> profList = createProfessors(-1);
		assertEquals(0, profList.size());
	}
	
	@Test
	public void checkProfessors3() {
		ArrayList<Professor> profList = createProfessors(500);
		assertEquals(500, profList.size());
	}
	
	@Test
	public void checkRooms1() {
		ArrayList<Room> roomList = createRooms(0);
		assertEquals(0, roomList.size());
	}
	
	@Test
	public void checkRooms2() {
		ArrayList<Room> roomList = createRooms(-1);
		assertEquals(0, roomList.size());
	}
	
	@Test
	public void checkRooms3() {
		ArrayList<Room> roomList = createRooms(500);
		assertEquals(500, roomList.size());
	}
	
	@Test
	public void checkCourses1() {
		ArrayList<Professor> profList = createProfessors(500);
		ArrayList<Course> courseList = createCourses(100, profList);
		assertEquals(100, courseList.size());
	}
	
	@Test
	public void checkCourses2() {
		ArrayList<Professor> profList = createProfessors(500);
		ArrayList<Course> courseList = createCourses(0, profList);
		assertEquals(0, courseList.size());
	}
	
	@Test
	public void checkCourses3() {
		ArrayList<Professor> profList = createProfessors(500);
		ArrayList<Course> courseList = createCourses(-1, profList);
		assertEquals(0, courseList.size());
	}
	
	@Test
	public void checkInsufficientProfessors() {
		initiate(1, 20, 20, (long) 0.05);
		assertTrue(solvedCourseSchedule.getScore().getHardScore() < 0);
	}
	
	@Test
	public void checkInsufficientRooms() {
		initiate(20, 20, 1, (long) 0.05);
		assertTrue(solvedCourseSchedule.getScore().getHardScore() < 0);
	}
	
	@Test
	public void checkInsufficientProfAndRoom() {
		initiate(1, 20, 1, (long) 0.05);
		assertTrue(solvedCourseSchedule.getScore().getHardScore() < 0);
	}
	
	@Test
	public void checkComplete() {
		initiate(20, 3, 20);
		assertTrue(solvedCourseSchedule.getScore().getHardScore() >= 0);
	}
	
	public void initiate(int profNum, int courseNum, int roomNum) {
		ArrayList<Professor> profList = createProfessors(profNum);
		ArrayList<Course> courseList = createCourses(courseNum, profList);
		lectureList = (ArrayList<Lecture>) generateLectures(courseList);
		ArrayList<Room> roomList = createRooms(roomNum);
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule(lectureList, roomList, profList);
		solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
		solvedLectureList = (ArrayList<Lecture>) solvedCourseSchedule.getLectureList();
	}
	
	public void initiate(int profNum, int courseNum, int roomNum, long time) {
		ArrayList<Professor> profList = createProfessors(profNum);
		ArrayList<Course> courseList = createCourses(courseNum, profList);
		lectureList = (ArrayList<Lecture>) generateLectures(courseList);
		ArrayList<Room> roomList = createRooms(roomNum);
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		solverFactory.getSolverConfig()
        .setTerminationConfig(new TerminationConfig()
                .withMinutesSpentLimit(time));
		solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule(lectureList, roomList, profList);
		solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
		solvedLectureList = (ArrayList<Lecture>) solvedCourseSchedule.getLectureList();
	}
	
	private static ArrayList<Course> createCourses(int numCourses, ArrayList<Professor> profList) {
		ArrayList<Course> courseList = new ArrayList<Course>();
		Random rand = new Random();
		for (int i = 0; i < numCourses; i++) {
			int numClass = rand.nextInt(4);
			ArrayList<Integer> tempPeriodList = new ArrayList<Integer>();
			for (int j = 0; j < numClass; j++) {
				tempPeriodList.add(rand.nextInt(4));
			}
			int numProf = rand.nextInt(3);
			ArrayList<String> tempProfList = new ArrayList<String>();
			for (int j = 0; j < numProf; j++) {
				int profIndex = (int) (Math.random() * profList.size());
				tempProfList.add(profList.get(profIndex).getInstructorName());
			}
			Course tempCourse = new Course(randomString(5), randomString(10), rand.nextInt(4), numClass, tempPeriodList, tempProfList);
			courseList.add(tempCourse);
		}
		return courseList;
	}
	
	private static ArrayList<Professor> createProfessors(int numProf) {
		ArrayList<Professor> profList = new ArrayList<Professor>();
		for (int i=0; i<numProf; i++) {
			profList.add(new Professor(randomString(7), randomString(4)));
		}
		return profList;
	}
	
	private static ArrayList<Room> createRooms(int numRooms) {
		ArrayList<Room> roomList = new ArrayList<Room>();
		for (int i = 0; i < numRooms; i++) {
			Room tempRoom = new Room(randomString(5), randomString(5), 5);
			roomList.add(tempRoom);
		}
		return roomList;
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
	
	private static String randomString(int n) {
		String alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
				+ "abcdefghijklmnopqrstuvwxyz";
		StringBuilder sb = new StringBuilder(n);
		for (int i=0; i<n; i++) {
			int index = (int) (alphabets.length() * Math.random());
			sb.append(alphabets.charAt(index));
		}
		return sb.toString();
	}
	
}
