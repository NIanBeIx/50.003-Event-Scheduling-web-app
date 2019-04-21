package mypackage;
import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.lookup.PlanningId;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

import mypackage.Timeslot.Day;

@PlanningEntity
public class Lecture {
	private String lectureId;
	Timeslot timeslot;
	private Room room;
	private Professor professor;
	private Course course;
	
	private String classNumber; // class per week
	private String cohortNumber; // group of students
	
	public Lecture() {}

	public Lecture(String lectureId, int requiredTimeslots, Course course) {
		this.lectureId = lectureId;
		this.timeslot = new Timeslot(requiredTimeslots);
		this.course = course;
	}
	
	public String getLectureId() {
		return lectureId;
	}
	
	@PlanningVariable(valueRangeProviderRefs = "startSlotRange")
	public Integer getStartSlot() {
		return timeslot.getStartSlot();
	}
	
	public void setStartSlot(Integer startSlot) {
		this.timeslot.setStartSlot(startSlot);
	}
	
	@PlanningVariable (valueRangeProviderRefs = "daySlotRange")
	public Day getDaySlot() {
		return timeslot.getDaySlot();
	}
	
	public void setDaySlot(Day daySlot) {
		this.timeslot.setDaySlot(daySlot);
	}
	
	@PlanningVariable(valueRangeProviderRefs = "roomRange")
	public Room getRoom() {
		return room;
	}
	
	public void setRoom(Room room) {
		this.room = room;
	}
	
	@PlanningVariable(valueRangeProviderRefs = "professorRange")
	public Professor getProfessor() {
		return professor;
	}
	
	public void setProfessor(Professor professor) {
		this.professor = professor;
	}
	
	public Course getCourse() {
		return course;
	}
	
	public void giveProfLecture() {
		professor.addLecture(this);
	}
	
	public String getClassNumber() {
		return classNumber;
	}
	
	public void setClassNumber(String classNumber) {
		this.classNumber = classNumber;
	}
	
	public String getCohortNumber() {
		return cohortNumber;
	}
	
	public void setCohortNumber(String cohortNumber) {
		this.cohortNumber = cohortNumber;
	}
}
