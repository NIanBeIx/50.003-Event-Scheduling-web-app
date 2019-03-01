import java.util.List;

import org.optaplanner.core.api.domain.solution.PlanningEntityCollectionProperty;
import org.optaplanner.core.api.domain.solution.PlanningScore;
import org.optaplanner.core.api.domain.solution.PlanningSolution;
import org.optaplanner.core.api.domain.solution.drools.ProblemFactCollectionProperty;
import org.optaplanner.core.api.domain.valuerange.ValueRangeProvider;
import org.optaplanner.core.api.score.buildin.hardsoft.HardSoftScore;

@PlanningSolution
public class CourseSchedule {
	
	private List<Timeslot> timeslotList;
	private List<Lecture> lectureList;
	private HardSoftScore score;
	
	@PlanningEntityCollectionProperty
	public List<Lecture> getLectureList() {
		return lectureList;
	}
	
	public void setLectureList(List<Lecture> lectureList) {
		this.lectureList = lectureList;
	}
	
	@ValueRangeProvider(id = "timeslotRange")
	@ProblemFactCollectionProperty
	public List<Timeslot> getTimeslotList() {
		return timeslotList;
	}
	
	public void setTimeslotList(List<Timeslot> timeslotList) {
		this.timeslotList = timeslotList;
	}
	
	@PlanningScore
	public HardSoftScore getScore() {
		return score;
	}
	
	public void setScore(HardSoftScore score) {
		this.score = score;
	}

}
