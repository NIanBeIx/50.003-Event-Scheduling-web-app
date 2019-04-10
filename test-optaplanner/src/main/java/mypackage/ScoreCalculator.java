package mypackage;

import java.util.Arrays;
import java.util.HashMap;

import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

public class ScoreCalculator implements EasyScoreCalculator<CourseSchedule>{
	
	public HardSoftScore calculateScore(CourseSchedule courseSchedule) {
		int hardScore = 0;
		int softScore = 0;
		
		HashMap<String, Boolean[][]> roomMap = new HashMap<String, Boolean[][]>();
		HashMap<String, Boolean[][]> profMap = new HashMap<String, Boolean[][]>();
		
		for (Lecture lecture: courseSchedule.getLectureList()) {
			if (lecture.getStartSlot() != null && lecture.getRoom() != null && lecture.getDaySlot() != null) {
				
				if (lecture.timeslot.getEndSlot() >= Timeslot.NUMSTARTSLOTSINDAY) {
					hardScore -= 1;
					continue;
				}
				
				if (!lecture.getCourse().getProfessorList().contains(lecture.getProfessor().getInstructorName())) {
					hardScore -= 1;
					continue;
				}
				
				if (!roomMap.containsKey(lecture.getRoom().getRoomId())) {
					roomMap.put(lecture.getRoom().getRoomId(), initTimeslots());
				}
				
				if (!profMap.containsKey(lecture.getProfessor().getInstructorName())) {
					profMap.put(lecture.getProfessor().getInstructorName(), initTimeslots());
				}
				
				boolean containsRoomOccupiedTimeslot = false;
				boolean containsProfOccupiedTimeslot = false;
				for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
					if (roomMap.get(lecture.getRoom().getRoomId())[lecture.getDaySlot().ordinal()][i]) {
						containsRoomOccupiedTimeslot = true;
					}
					if (profMap.get(lecture.getProfessor().getInstructorName())[lecture.getDaySlot().ordinal()][i]) {
						containsProfOccupiedTimeslot = true;
					}
				}
				if (containsRoomOccupiedTimeslot) {
					hardScore -= 1;
				} else {
					for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
						roomMap.get(lecture.getRoom().getRoomId())[lecture.getDaySlot().ordinal()][i] = true;
					}
				}
				
				if (containsProfOccupiedTimeslot) {
					hardScore -= 1;
				} else {
					for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
						profMap.get(lecture.getProfessor().getInstructorName())[lecture.getDaySlot().ordinal()][i] = true;
					}
				}
			} else {
				hardScore -= 1;
			}
		}
		return HardSoftScore.of(hardScore, softScore);
	}

	private Boolean[][] initTimeslots() {
		Boolean[][] temp = new Boolean[Timeslot.NUMDAYSINWEEK][Timeslot.NUMSTARTSLOTSINDAY];
		for (Boolean[] day: temp) {
			Arrays.fill(day, false);
		}
		return temp;
	}
}
