import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;
import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;

import mypackage.CourseSchedule;
import mypackage.Lecture;
import mypackage.Timeslot;

public class TestCases {
	ArrayList<Lecture> solvedLectureList;
	@Before
	public void initiate() {
		ArrayList<Lecture> lectureList = new ArrayList<Lecture>();
		lectureList.add(new Lecture("Math"));
		lectureList.add(new Lecture("Science"));
		lectureList.add(new Lecture("Algo"));
		lectureList.add(new Lecture("Prob and Stats"));
		ArrayList<Timeslot> timeslotList = new ArrayList<Timeslot>();
		timeslotList.add(new Timeslot(1));
		timeslotList.add(new Timeslot(2));
		timeslotList.add(new Timeslot(3));
		timeslotList.add(new Timeslot(4));
		
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		Solver<CourseSchedule> solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule();
		unsolvedCourseSchedule.setLectureList(lectureList);
		unsolvedCourseSchedule.setTimeslotList(timeslotList);
		CourseSchedule solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
		solvedLectureList = (ArrayList<Lecture>) solvedCourseSchedule.getLectureList();
	}
	
	@Test
	public void checkNumLectures() {
		/*
		 * The number of lectures in the solved lecture list should be equal to the initial
		 * number of lectures we started with
		 */
		assert(solvedLectureList.size() == 4);
	}
	
	@Test
	public void checkNoRepeatingTimeslots() {
		/* 
		 * There should not be any repeating timeslots in a system with only 1 lecture for 
		 * each subject
		 */
		Set<Integer> tempSet = new HashSet<Integer>();
		for (Lecture lecture: solvedLectureList) {
			if (tempSet.contains(lecture.getTimeslot().getTimeslot())) {
				assertFalse(true);
			} else {
				tempSet.add(lecture.getTimeslot().getTimeslot());
			}
		}
		assertTrue(true);
	}
	
	@Test
	public void checkNoRepeatingLectures() {
		/* 
		 * There should not be any repeating lectures in a system with only 1 lecture for 
		 * each subject
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
	
}
