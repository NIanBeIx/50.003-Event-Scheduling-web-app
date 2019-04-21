package mypackage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Professor {
	private String instructorName;
	private String pillar;
	private List<Lecture> lectureList;
	private List<String> softConstraints;
	private HashMap<Integer, List<Integer>> realSoftConstraints;
	
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
	
	public void setSoftConstraints(List<String> softConstraints) {
		this.realSoftConstraints = new HashMap<Integer, List<Integer>>();
		for (String str: softConstraints) {
			String[] splited = str.split("\\s+");
			int day = Integer.valueOf(splited[0]);
			int period = Integer.valueOf(splited[1]);
			if (!this.realSoftConstraints.containsKey(day)) {
				this.realSoftConstraints.put(day, new ArrayList<Integer>());
			}
			this.realSoftConstraints.get(day).add(period);
		}
		this.softConstraints = softConstraints;
	}
	
	public List<String> getSoftConstraints() {
		return softConstraints;
	}
	
	public HashMap<Integer, List<Integer>> getRealSoftConstraints() {
		return realSoftConstraints;
	}
}
