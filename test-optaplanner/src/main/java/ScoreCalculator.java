import java.util.HashSet;

import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;
import org.optaplanner.core.impl.score.director.easy.EasyScoreCalculator;

public class ScoreCalculator implements EasyScoreCalculator<CourseSchedule>{
	
	public HardSoftScore calculateScore(CourseSchedule courseSchedule) {
		int hardScore = 0;
		int softScore = 0;
		
		HashSet<Timeslot> occupiedTimeslot = new HashSet<Timeslot>();
		for (Lecture lecture: courseSchedule.getLectureList()) {
			if (lecture.getTimeslot() != null) {
				Timeslot lectureTimeslot = lecture.getTimeslot();
				if (occupiedTimeslot.contains(lectureTimeslot)) {
					hardScore -= 1;
				} else {
					occupiedTimeslot.add(lectureTimeslot);
				}
			}
		}
		
		return HardSoftScore.of(hardScore, softScore);
	}

}
