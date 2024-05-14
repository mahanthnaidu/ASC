 
const getstudents = "SELECT * FROM student;";
const getstudentsinfo = "SELECT * FROM student WHERE student.id = $1 ;"
const getstudentscourse = "SELECT * FROM takes WHERE takes.Id = $1 ;"

const allstudents = "select student.id, student.name, student.dept_name, student.tot_cred from student order by student.dept_name ;" ;
const checkifinst = "select instructor.id, instructor.name, instructor.dept_name from instructor where instructor.id = $1 ;";
// login register page queries 
const checkidexists = "SELECT * FROM user_password WHERE user_password.id = $1 ;"

const adduser = "INSERT INTO user_password values($1, $2) RETURNING * ;"

// student home queries
const homestudentdisplay = "SELECT id, name, dept_name FROM student WHERE student.id = $1 ; "

const studentprevcourses = `with max_time(max_value) as(
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year,semester) as (
  select year,semester from reg_dates,max_time where reg_dates.start_time<=max_time.max_value order by start_time desc
  limit 1
)
select course.course_id, course.title, course.dept_name, course.credits, takes.grade, takes.year, takes.semester, takes.sec_id 
from takes natural join course, curr 
where takes.id = $1 and (takes.year, takes.semester) <> (curr.year, curr.semester) order by takes.year desc, takes.semester = 'Spring' desc, takes.semester = 'Summer' desc, takes.semester = 'Fall' desc, takes.semester = 'Summer' desc;
` ;

const studentcurrourses = `with max_time(max_value) as(
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year,semester) as (
  select year,semester from reg_dates,max_time where reg_dates.start_time<=max_time.max_value order by start_time desc
  limit 1
)
select course.course_id, course.title, course.dept_name, course.credits, takes.grade, takes.year, takes.semester, takes.sec_id 
from takes natural join course, curr
where takes.id = $1 and (takes.year, takes.semester) = (curr.year, curr.semester);
`;

const currsemcredits = `
with max_time(max_value) as(
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year,semester) as (
  select year,semester from reg_dates,max_time where reg_dates.start_time<=max_time.max_value order by start_time desc
  limit 1
)
select sum(course.credits) as total_credits
from takes natural join course, curr
where takes.id = $1 and (takes.year, takes.semester) = (curr.year, curr.semester) ;
`;

// course info page queries 
const courseinfo = "SELECT course.course_id, course.title, course.credits FROM course WHERE course.course_id= $1 ; ";

const courseprerequisite = `with temp(prereq_id) as (
  select prereq.prereq_id from prereq where prereq.course_id = $1 
)
select course.course_id, course.title, course.credits 
from course join temp 
on temp.prereq_id = course.course_id ;
`;

const currcourseinstructors = `with max_time(max_value) as(
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(yr,sem) as (
  select year,semester from reg_dates,max_time where reg_dates.start_time<=max_time.max_value order by start_time desc
  limit 1
), 
temp(i_id, name, dept_name, section, c_id, yr, sem) as (
  select instructor.id, instructor.name, instructor.dept_name, teaches.sec_id, teaches.course_id, teaches.year, teaches.semester
  from instructor
  join teaches
  on teaches.id = instructor.id
)
select temp.i_id, temp.name, temp.dept_name, temp.section 
from temp natural join curr
where temp.c_id = $1 ; 
` ;

// running and all courses information
const alldepartments = "SELECT course.dept_name as department, count(distinct course.course_id) as total_courses FROM course GROUP BY course.dept_name ;" ;

const allcourses = "SELECT course.course_id, course.title, course.dept_name, course.credits FROM course WHERE course.dept_name = $1 ;" ;

const runningdepartments = `with max_time(max_value) as(
    select max(start_time) from reg_dates where start_time < current_timestamp
  ),
  curr(yr,semester) as (
    select year,semester from reg_dates,max_time where reg_dates.start_time<=max_time.max_value order by start_time desc
    limit 1
  ),
  tem(c_id,title,dname,yr,sem) as (
    select course.course_id,course.title,course.dept_name,section.year,section.semester
    from section
    join course 
    on course.course_id = section.course_id
  )
  select distinct tem.dname as department, count(distinct tem.c_id) as total_courses 
  from tem join curr
  on tem.yr = curr.yr and tem.sem = curr.semester group by tem.dname;
` ;

const runningcourses = `
with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(yr, semester) as (
  select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1
),
tem(c_id, title, dname, yr, sem, credits) as (
  select course.course_id, course.title, course.dept_name, section.year, section.semester, course.credits from section
  join course on course.course_id = section.course_id
)
select distinct tem.c_id as course_id, tem.title, tem.credits from tem join curr on tem.yr = curr.yr and tem.sem = curr.semester where tem.dname = $1;
` ;

// instructor page queries 
const getinstructorinfo = "SELECT instructor.name, instructor.dept_name FROM instructor WHERE instructor.id = $1 ;" ;

const getinstructorprevcourses = `with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year, semester) as (
  select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1
)
select teaches.course_id, course.title, course.credits, teaches.year, teaches.semester 
from teaches natural join course, curr
where teaches.id = $1 and (teaches.year, teaches.semester) <> (curr.year,curr.semester) order by teaches.year desc, teaches.semester = 'Spring' desc, teaches.semester = 'Summer' desc, teaches.semester = 'Fall' desc, teaches.semester = 'Summer' desc ;
`;

const getinstructorcurrcourses = `with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(yr, semester) as (
  select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1
),
temp(i_id,semester, year, course_id,title, credits) as (
  select teaches.id, teaches.semester, teaches.year, teaches.course_id, course.title, course.credits
  from teaches join course
  on course.course_id = teaches.course_id 
)
select temp.course_id, temp.title, temp.credits from temp join curr on temp.semester = curr.semester and temp.year = curr.yr where temp.i_id = $1 order by course_id;
`;



// registration page queries 
const dropcourse = "delete from takes where takes.course_id = $1 and takes.sec_id = $2 returning * ;";

const searchcourses = `with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year, semester) as (
  select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1
),
temp(course_id, title, sec_id, year, semester, time_slot_id) as (
  select course.course_id, course.title, section.sec_id, section.year, section.semester, section.time_slot_id
  from course natural join section, curr
  where (section.year, section.semester) = (curr.year, curr.semester) order by course.course_id  
)
select temp.course_id, temp.title, temp.sec_id, temp.year, temp.semester, temp.time_slot_id
from temp
where temp.course_id ilike $1 or temp.title ilike $1 ;
`;

const satisfyprereq = `with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
),
curr(year, semester) as (
  select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1
)
;`



// other queries 
const currentsemester = `with max_time(max_value) as (
  select max(start_time) from reg_dates where start_time < current_timestamp
)
select year, semester from reg_dates, max_time where reg_dates.start_time <= max_time.max_value order by start_time desc limit 1 ;
`;





module.exports = {
    checkidexists,
    adduser,
    homestudentdisplay,
    studentprevcourses,
    studentcurrourses,
    currsemcredits,
    courseinfo,
    courseprerequisite,
    currcourseinstructors,
    runningcourses,
    runningdepartments,
    allcourses,
    alldepartments,
    getinstructorinfo,
    getinstructorprevcourses,
    getinstructorcurrcourses,
    currentsemester,
    dropcourse,
    searchcourses,
    checkifinst,
    allstudents,
};




