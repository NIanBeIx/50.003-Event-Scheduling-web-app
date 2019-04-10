package mypackage;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Professor {
	private String instructorName;
	private String pillar;
	private List<Lecture> lectureList;
	
	public Professor() {}
	
	public Professor(String instructorName, String pillar) {
		this.instructorName = instructorName;
		this.pillar = pillar;
		this.lectureList = new ArrayList<Lecture>();
	}
	
	public List<Lecture> getLectureList() {
		return lectureList;
	}
	
	public String getInstructorName() {
		return instructorName;
	}
	
	public String getPillar() {
		return pillar;
	}
	
	public void addLecture(Lecture lecture) {
		if (lectureList == null) {
			this.lectureList = new ArrayList<Lecture>();
		}
		lectureList.add(lecture);
	}
}
