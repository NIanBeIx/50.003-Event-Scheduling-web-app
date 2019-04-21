package mypackage;

public class Timeslot implements Comparable<Timeslot>{
	public static enum Day {
		MONDAY,
		TUESDAY,
		WEDNESDAY,
		THURSDAY,
		FRIDAY
	}
	public static String[] startTimeList = {"0830",
			"0900",
			"0930",
			"1000",
			"1030",
			"1100",
			"1130",
			"1200",
			"1230",
			"1300",
			"1330",
			"1400",
			"1430",
			"1500",
			"1530",
			"1600"};
	public static String[] timeList = {"0830",
			"0900",
			"0930",
			"1000",
			"1030",
			"1100",
			"1130",
			"1200",
			"1230",
			"1300",
			"1330",
			"1400",
			"1430",
			"1500",
			"1530",
			"1600",
			"1630",
			"1700",
			"1730",
			"1800",
			"1830",
			"1900",
			"1930",
			"2000",
			"2030",
			"2100",
			"2130"};
	public final static int NUMDAYSINWEEK = 5;
	public final static int NUMSTARTSLOTSINDAY = startTimeList.length;
	
	private int startSlot;
	private int endSlot;
	private int requiredTimeslots;
	private Day daySlot;
	
	
	public Timeslot(int requiredTimeslots) {
		this.requiredTimeslots = requiredTimeslots;
	}
	
	public int compareTo(Timeslot t) {
		if (daySlot.ordinal() < t.getDaySlot().ordinal()) {
			return -1;
		} else if (daySlot.ordinal() > t.getDaySlot().ordinal()) {
			return 1;
		} else {
//			if (endSlot < t.getStartSlot()) {
//				return -1;
//			} else if (startSlot > t.getEndSlot()) {
//				return 1;
//			} else
//				return 0;
			return 0;
		}
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
