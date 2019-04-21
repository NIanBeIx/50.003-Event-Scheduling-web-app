package mypackage;

import java.io.File;
import java.util.Calendar;
import java.util.TimeZone;

import biweekly.Biweekly;
import biweekly.ICalendar;
import biweekly.component.VEvent;
import biweekly.property.Location;
import biweekly.property.Summary;
import biweekly.util.Duration;
import biweekly.util.Frequency;
import biweekly.util.Recurrence;


public class CalManager {
	public static void main(String[] args) {
		ICalendar ical = new ICalendar();
		VEvent event = new VEvent();
		Summary summary = event.setSummary("Team Meeting");
		summary.setLanguage("en-us");
		TimeZone timezone = TimeZone.getTimeZone("Asia/Singapore");
		CalManager calman = new CalManager();
		    Calendar start = calman.createTime(timezone, 1, 1, 1);
		    event.setDateStart(start.getTime());

		    Duration duration = new Duration.Builder().hours(1).build();
		    event.setDuration(duration);

		    Recurrence recur = new Recurrence.Builder(Frequency.WEEKLY).interval(2).build();
		    event.setRecurrenceRule(recur);
		  ical.addEvent(event);
		  File file = new File("./test.ics");
		  try {
			  Biweekly.write(ical).go(file);
		  } catch (Exception e) {
			  e.printStackTrace();
		  }
		

//		String str = Biweekly.write(ical).go();
//		System.out.println(str);

	}
	
	public ICalendar createCalendar(Professor prof) {
		ICalendar ical = new ICalendar();
		for (Lecture lecture: prof.getLectureList()) {
			VEvent event = createEvent(lecture);
			ical.addEvent(event);
		}
		ical.addDescription(prof.getInstructorName());
		return ical;
	}
	
	public VEvent createEvent(Lecture lecture) {
		VEvent event = new VEvent();
		TimeZone timezone = TimeZone.getTimeZone("Asia/Singapore");
		
		Summary summary = event.setSummary(lecture.getLectureId());
		summary.setLanguage("en-us");
		
		Location location = event.setLocation(lecture.getRoom().getRoomId() + ": " + lecture.getRoom().getRoomName());
		
		// obtain lecture day, start hour, start minute
		int day = lecture.timeslot.getDaySlot().ordinal();
		Integer[] timing = parseTime(lecture.timeslot.getStartTime());
		
		// create start time
		Calendar cal = createTime(timezone, day, timing[0], timing[1]);
		event.setDateStart(cal.getTime());
		
		// specify duration
		Duration duration = new Duration.Builder().hours(lecture.timeslot.getRequiredTimeslots()/2)
				.minutes(30*(lecture.timeslot.getRequiredTimeslots()%2)).build();
		event.setDuration(duration);
		
		// specify recurrence
		Recurrence recur = new Recurrence.Builder(Frequency.WEEKLY).interval(13).build();
		event.setRecurrenceRule(recur);
		
		return event;
	}
	
	public Calendar createTime(TimeZone timezone, int day, int hour, int minute) {
		Calendar cal = Calendar.getInstance(timezone);
		cal.set(Calendar.DAY_OF_WEEK, day);
		cal.set(Calendar.HOUR_OF_DAY, hour);
		cal.set(Calendar.MINUTE, minute);
		return cal;
	}
	
	public Integer[] parseTime(String time) {
		int hour = Integer.valueOf(time.substring(0, 2));
		int minute = Integer.valueOf(time.substring(2));
		Integer[] returnThis = {hour, minute};
		return returnThis;
	}
}
