import java.util.ArrayList;

import org.optaplanner.core.api.solver.Solver;
import org.optaplanner.core.api.solver.SolverFactory;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<Lecture> lectureList = new ArrayList<Lecture>();
		lectureList.add(new Lecture("Math"));
		lectureList.add(new Lecture("Science"));
		lectureList.add(new Lecture("Algo"));
		lectureList.add(new Lecture("Prob and Stats"));
		ArrayList<Timeslot> timeslotList = new ArrayList<Timeslot>();
		timeslotList.add(new Timeslot(1));
		timeslotList.add(new Timeslot(2));
		timeslotList.add(new Timeslot(3));
//		timeslotList.add(new Timeslot(4));
//		timeslotList.add(new Timeslot(5));
		
		SolverFactory<CourseSchedule> solverFactory = SolverFactory.createFromXmlResource("SolverConfig.xml");
		Solver<CourseSchedule> solver = solverFactory.buildSolver();
		CourseSchedule unsolvedCourseSchedule = new CourseSchedule();
		unsolvedCourseSchedule.setLectureList(lectureList);
		unsolvedCourseSchedule.setTimeslotList(timeslotList);
		CourseSchedule solvedCourseSchedule = solver.solve(unsolvedCourseSchedule);
		
		ArrayList<Lecture> solvedLectureList = (ArrayList<Lecture>) solvedCourseSchedule.getLectureList();
		for (Lecture lecture: solvedLectureList) {
			System.out.println(lecture.getLectureId());
			System.out.println(lecture.getTimeslot().getTimeslot());
		}
	}

}
