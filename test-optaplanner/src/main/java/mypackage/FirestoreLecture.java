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
	String startTime;
	String endTime;
	public static String[] timeList = {"8:30am",
			"9:00am",
			"9:30am",
			"10:00am",
			"10:30am",
			"11:00am",
			"11:30am",
			"12:00pm",
			"12:30pm",
			"1:00pm",
			"1:30pm",
			"2:00pm",
			"2:30pm",
			"3:00pm",
			"3:30pm",
			"4:00pm",
			"4:30pm",
			"5:00pm",
			"5:30pm",
			"6:00pm",
			"6:30pm",
			"7:00pm",
			"7:30pm",
			"8:00pm",
			"8:30pm",
			"9:00pm",
			"9:30pm"};
	
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
		this.startTime = timeList[Integer.valueOf(this.startPeriod)];
		this.endTime = timeList[Integer.valueOf(this.startPeriod) + Integer.valueOf(this.numPeriods)];
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
	
	public String getStartTime() {
		return startTime;
	}
	
	public String getEndTime() {
		return endTime;
	}

}
