package mypackage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;

import mypackage.Timeslot.Day;

@PlanningSolution
public class CourseSchedule {
	
	private List<Lecture> lectureList;
	private List<Integer> startSlotList;
	private List<Day> daySlotList;	
	private List<Room> roomList; 
	private List<Professor> professorList;
	private HardSoftScore score;
	
	public CourseSchedule() {}
	
	public CourseSchedule(List<Lecture> lectureList, List<Room> roomList, List<Professor> professorList) {
		this.lectureList = lectureList;
		this.roomList = roomList;
		this.professorList = professorList;
		this.startSlotList = new ArrayList<Integer>();
		this.daySlotList = new ArrayList<Day>(Arrays.asList(Timeslot.Day.values()));
		for (int i = 0; i < Timeslot.NUMSTARTSLOTSINDAY; i++) {
			startSlotList.add(i);
		}
	}
	
	@PlanningEntityCollectionProperty
	public List<Lecture> getLectureList() {
		return lectureList;
	}
	
	public void setLectureList(List<Lecture> lectureList) {
		this.lectureList = lectureList;
	}
	
	@ValueRangeProvider(id = "startSlotRange")
	@ProblemFactCollectionProperty
	public List<Integer> getStartSlotList() {
		return startSlotList;
	}
	
	public void setStartSlotList(List<Integer> startSlotList) {
		this.startSlotList = startSlotList;
	}
	
	@ValueRangeProvider(id = "daySlotRange")
	@ProblemFactCollectionProperty
	public List<Day> getDaySlotList() {
		return daySlotList;
	}
	
	public void setDaySlotList(List<Day> daySlotList) {
		this.daySlotList = daySlotList;
	}
	
	@ValueRangeProvider(id = "roomRange")
	@ProblemFactCollectionProperty
	public List<Room> getRoomList() {
		return roomList;
	}
	
	public void setRoomList(List<Room> roomList) {
		this.roomList = roomList;
	}
	
	@ValueRangeProvider(id = "professorRange")
	@ProblemFactCollectionProperty
	public List<Professor> getProfessorList() {
		return professorList;
	}
	
	public void setProfessorList(List<Professor> professorList) {
		this.professorList = professorList;
	}
	
	@PlanningScore
	public HardSoftScore getScore() {
		return score;
	}
	
	public void setScore(HardSoftScore score) {
		this.score = score;
	}

}
