function SessionDB(a,b,c,d,e,f,g,h,i,j,k,l){
    this.sessionID=a;//string
    this.courseName=b;//string
    this.courseID=c;//string of courseID
    this.numberOfStudentsPerSession=d;//number
    this.type=e;//string
    this.durationHour=f;//number
    this.classroomUsed=g;//string of classroomID
    this.whichWeek=h;//number
    this.dayOfWeek=i;//number
    this.startTime=j;//string or number???
    this.endTime=k;//string or number???
    this.classParticipating=l;//list of classID
}


//////////////////////////////////////////////////////////

function ClassDB(a,b,c){
    this.classID=a;//string
    this.numberOfStudents=b;//number
    this.listOfCoursesParticipating=c;//list of courseID
}

/////////////////////////////////////////////////////////////

function ClassroomDB(a,b,c,e){
    this.classroomID=a;//stirng
    this.capacity=b;//number
    this.listOfSessionInUse=c;//list of sessionID
    this.type=e;//string
}

///////////////////////////////////////////////////////////

function InstructorDB(a,b,c,d){
    this.name=a;//string
    this.ID=b;//string
    this.courseIDOfTeaching=c;//list of courseID
    this.listOfSessionInCharge=d;//list of sessionID
}


//////////////////////////////////////////////////////////

function CourseDB(a,b){
    this.CourseID=a;//string
    this.courseName=b;//string
}