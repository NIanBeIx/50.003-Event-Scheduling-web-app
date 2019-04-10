package mypackage;

public class FirestoreLecture {
	String courseName;
	String roomId;
	String roomName;
	String classNumber; // The n-th class of the week
	String cohortNumber; // The index of the cohort (group of students)
	String day;
	String startPeriod;
	String numPeriods;
	
	public FirestoreLecture() {
		
	}
	
	public FirestoreLecture(Lecture lecture) {
		this.courseName = lecture.getCourse().getCourseName();
		this.roomId = lecture.getRoom().getRoomId();
		this.roomName = lecture.getRoom().getRoomName();
		this.classNumber = lecture.getClassNumber();
		this.cohortNumber = lecture.getCohortNumber();
		this.day = String.valueOf(lecture.getDaySlot());
		this.startPeriod = String.valueOf(lecture.getStartSlot());
		this.numPeriods = String.valueOf(lecture.timeslot.getRequiredTimeslots());
	}
	
	public String getCourseName() {
		return courseName;
	}
	
	public String getRoomId() {
		return roomId;
	}
	
	public String getRoomName() {
		return roomName;
	}
	
	public String getClassNumber() {
		return classNumber;
	}
	
	public String getCohortNumber() {
		return cohortNumber;
	}
	
	public String getDay() {
		return day;
	}
	
	public String getStartPeriod() {
		return startPeriod;
	}
	
	public String getNumPeriods() {
		return numPeriods;
	}

}
