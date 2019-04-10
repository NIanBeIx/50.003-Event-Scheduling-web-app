package mypackage;

import java.util.List;

public class Course {
	private String courseId;
	private String courseName;
	private int numberOfCohorts;
	private int numberOfClasses;
	private List<Integer> classPeriodList;
	private List<String> professorList;
	
	private Lecture[] lectureArray;
	
	public Course() {}
	
	public Course(String courseId, String courseName, int numberOfCohorts, 
			int numberOfClasses, List<Integer> classPeriodList, List<String> professorList) {
		this.courseId = courseId;
		this.courseName = courseName;
		this.numberOfCohorts = numberOfCohorts;
		this.numberOfClasses = numberOfClasses;
		this.classPeriodList = classPeriodList;
		this.professorList = professorList;
	}
	
	public void setClassPeriodList(List<Integer> classPeriodList) {
		this.classPeriodList = classPeriodList;
	}
	
	public void setCourseId(String courseId) {
		this.courseId = courseId;
	}
	
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	
	public void setNumberOfClasses(int numberOfClasses) {
		this.numberOfClasses = numberOfClasses;
	}
	
	public void setNumberOfCohorts(int numberOfCohorts) {
		this.numberOfCohorts = numberOfCohorts;
	}
	
	public void setProfessorList(List<String> professorList) {
		this.professorList = professorList;
	}
	
	public String getCourseId() {
		return courseId;
	}
	
	public String getCourseName() {
		return courseName;
	}
	
	public int getNumberOfClasses() {
		return numberOfClasses;
	}
	
	public int getNumberOfCohorts() {
		return numberOfCohorts;
	}
	
	public List<Integer> getClassPeriodList() {
		return classPeriodList;
	}
	
	public List<String> getProfessorList() {
		return professorList;
	}
	
	public void initLectureArray() {
		this.lectureArray = new Lecture[numberOfCohorts * numberOfClasses];
	}
	
	public Lecture[] getLectureArray() {
		return lectureArray;
	}
}
