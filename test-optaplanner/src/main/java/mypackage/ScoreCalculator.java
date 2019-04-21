package mypackage;

import java.util.ArrayList;
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
		HashMap<String, Boolean[][]> classMap = new HashMap<String, Boolean[][]>();
		HashMap<String, Lecture[]> lectureMap = new HashMap<String, Lecture[]>();
		
		for (Lecture lecture: courseSchedule.getLectureList()) {
			if (lecture.getStartSlot() != null && lecture.getRoom() != null && lecture.getDaySlot() != null) {
				String courseName = lecture.getCourse().getCourseName();
				String roomId = lecture.getRoom().getRoomId();
				String instructorName = lecture.getProfessor().getInstructorName();
				boolean isLecture = (Integer.valueOf(lecture.getCohortNumber()) == -1);
				
				//init pillarBatchCohorts
				String[] pillarBatchCohorts = null;
				if (isLecture) {
					pillarBatchCohorts = new String[lecture.getCourse().getNumberOfCohorts()];
					for (int i = 0; i < lecture.getCourse().getNumberOfCohorts(); i++) {
						pillarBatchCohorts[i] = lecture.getCourse().getPillarBatch() + i;
					}
				} else {
					pillarBatchCohorts = new String[1];
					pillarBatchCohorts[0] = lecture.getCourse().getPillarBatch() + lecture.getCohortNumber();
				}
				
				// check if lecture ends after it starts
				if (lecture.timeslot.getEndSlot() >= Timeslot.NUMSTARTSLOTSINDAY) {
					hardScore -= 5;
					continue;
				}
				
				// check if the correct professors are teaching
				if (!lecture.getCourse().getProfessorList().contains(instructorName)) {
					hardScore -= 5;
					continue;		
				}
				
				// check that only lectures occur in Lecture Theatres
				if (lecture.getCohortNumber().equals("-1")) {
					if (!lecture.getRoom().getRoomType().equals("Lecture Theatre"))
						hardScore -= 1;
				} else {
					if (lecture.getRoom().getRoomType().equals("Lecture Theatre"))
						hardScore -= 1;
				}
				
				// init room availability map
				if (!roomMap.containsKey(roomId)) {
					roomMap.put(roomId, initTimeslots());
				}
				
				// init prof availability map
				if (!profMap.containsKey(instructorName)) {
					profMap.put(instructorName, initTimeslots());
				}
				
				// init pillar-batch-cohort availability map
				for (String pillarBatchCohort: pillarBatchCohorts) {
					if (!classMap.containsKey(pillarBatchCohort)) {
						classMap.put(pillarBatchCohort, initTimeslots());
					}
				}
				
				//handle lecture sequence
				int lectureNum = Integer.valueOf(lecture.getClassNumber());
				if (isLecture) {
					for (int i = 0; i < lecture.getCourse().getNumberOfCohorts(); i++) {
						if (!lectureMap.containsKey(courseName + i)) {
							lectureMap.put(courseName + i, new Lecture[lecture.getCourse().getNumberOfClasses()]);
							lectureMap.get(courseName + i)[lectureNum] = lecture;
						} else {
							int otherLectureNum = 0;
							for (Lecture otherLecture: lectureMap.get(courseName + i)) {
								if (otherLecture != null) {
									if ((lectureNum < otherLectureNum && lecture.timeslot.compareTo(otherLecture.timeslot) >= 0) ||
											(lectureNum > otherLectureNum && lecture.timeslot.compareTo(otherLecture.timeslot) <= 0))
										hardScore -= 1;
								}
								otherLectureNum++;
							}
							lectureMap.get(courseName + i)[lectureNum] = lecture;
						}
					}
				} else {
					if (!lectureMap.containsKey(courseName + lecture.getCohortNumber())) {
						lectureMap.put(courseName + lecture.getCohortNumber(),  new Lecture[lecture.getCourse().getNumberOfClasses()]);
						lectureMap.get(courseName + lecture.getCohortNumber())[lectureNum] = lecture;
					} else {
						int otherLectureNum = 0;
						for (Lecture otherLecture: lectureMap.get(courseName + lecture.getCohortNumber())) {
							if (otherLecture != null) {
								if ((lectureNum < otherLectureNum && lecture.timeslot.compareTo(otherLecture.timeslot) >= 0) ||
										(lectureNum > otherLectureNum && lecture.timeslot.compareTo(otherLecture.timeslot) <= 0))
									hardScore -= 1;
							}
							otherLectureNum++;
						}
						lectureMap.get(courseName + lecture.getCohortNumber())[lectureNum] = lecture;
					}
				}
				
				boolean containsRoomOccupiedTimeslot = false;
				boolean containsProfOccupiedTimeslot = false;
				boolean[] containsPBCOccupiedTimeslot = new boolean[pillarBatchCohorts.length];
				Arrays.fill(containsPBCOccupiedTimeslot, false);
				for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
					if (roomMap.get(roomId)[lecture.getDaySlot().ordinal()][i]) {
						containsRoomOccupiedTimeslot = true;
					}
					if (profMap.get(instructorName)[lecture.getDaySlot().ordinal()][i]) {
						containsProfOccupiedTimeslot = true;
					}
					for (int j = 0; j < pillarBatchCohorts.length; j++) {
						if (classMap.get(pillarBatchCohorts[j])[lecture.getDaySlot().ordinal()][i]) {
							containsPBCOccupiedTimeslot[j] = true;
						}
					}					
				}
				if (containsRoomOccupiedTimeslot) {
					hardScore -= 1;
				} else {
					for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
						roomMap.get(roomId)[lecture.getDaySlot().ordinal()][i] = true;
					}
				}
				
				if (containsProfOccupiedTimeslot) {
					hardScore -= 1;
				} else {
					for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
						profMap.get(instructorName)[lecture.getDaySlot().ordinal()][i] = true;
						if (lecture.getProfessor().getRealSoftConstraints() != null) {
							if (lecture.getProfessor().getRealSoftConstraints().containsKey(lecture.getDaySlot().ordinal())) {
								if (!lecture.getProfessor().getRealSoftConstraints().get(lecture.getDaySlot().ordinal()).contains(i)) {
									softScore += 1;
								}
							} else {
								softScore += 1;
							}
						}
					}
				}
				
				for (int j = 0; j < containsPBCOccupiedTimeslot.length; j++) {
					boolean contain = containsPBCOccupiedTimeslot[j];
					if (contain) {
						hardScore -= 1;
					} else {
						for (int i = lecture.getStartSlot(); i <= lecture.timeslot.getEndSlot(); i++) {
							classMap.get(pillarBatchCohorts[j])[lecture.getDaySlot().ordinal()][i] = true;
						}
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
