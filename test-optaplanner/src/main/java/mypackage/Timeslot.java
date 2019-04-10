package mypackage;

public class Timeslot {
	public static enum Day {
		MONDAY,
		TUESDAY,
		WEDNESDAY,
		THURSDAY,
		FRIDAY
	}
	public static String[] startTimeList = {"8:30am",
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
			"6:00pm"};
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
			"9:00pm"};
	public final static int NUMDAYSINWEEK = 5;
	public final static int NUMSTARTSLOTSINDAY = startTimeList.length;
	
	private int startSlot;
	private int endSlot;
	private int requiredTimeslots;
	private Day daySlot;
	
	
	public Timeslot(int requiredTimeslots) {
		this.requiredTimeslots = requiredTimeslots;
	}
	
	public Integer getStartSlot() {
		return startSlot;
	}
	
	public Integer getEndSlot() {
		return endSlot;
	}
	
	public int getRequiredTimeslots() {
		return requiredTimeslots;
	}
	
	public void setStartSlot(int startSlot) {
		this.startSlot = startSlot;
		// May have issue here if last timeslot is picked, but requiredTimeslots > 1
		this.endSlot = startSlot + requiredTimeslots - 1;
	}
	
	public String getStartTime() {
		return timeList[startSlot];
	}
	
	public String getEndTime() {
		return timeList[endSlot + 1];
	}
	
	public void setDaySlot(Day daySlot) {
		this.daySlot = daySlot;
	}
	
	public Day getDaySlot() {
		return this.daySlot;
	}
}
