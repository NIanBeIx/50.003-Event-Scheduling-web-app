import org.optaplanner.core.api.domain.entity.PlanningEntity;
import org.optaplanner.core.api.domain.variable.PlanningVariable;

@PlanningEntity
public class Lecture {
	private String lectureId;
	private Timeslot timeslot;
	
	public Lecture() {}
	
	public Lecture(String lectureId) {
		this.lectureId = lectureId;
	}
	
	public String getLectureId() {
		return lectureId;
	}
	
	@PlanningVariable(valueRangeProviderRefs= "timeslotRange")
	public Timeslot getTimeslot() {
		return timeslot;
	}
	
	public void setTimeslot(Timeslot timeslot) {
		this.timeslot = timeslot;
	}
}
