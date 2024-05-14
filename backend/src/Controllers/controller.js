// here we store our business logic related to our route
const { check } = require('express-validator');
const pool = require('../../db.js');
const queries = require('../queries.js');
const bcrypt = require('bcryptjs');


var session ;

const login = async(req, res) => {
    try {
        const { ID, hashed_password } = req.body;
        // console.log(hashed_password)

        const user = await pool.query(queries.checkidexists, [ID]);
        if (user.rows.length === 0) {
            // console.log("Y");
            return res.status(401).json({message :"ID does not exist"});
        }
        // console.log(user.rows);
        const validpassword = await bcrypt.compare(hashed_password,user.rows[0].hashed_password) ;
        // console.log(validpassword) ;

        if (!validpassword) {
            return res.status(401).json({message :"Password or id is incorrect"});
        } else {
            // console.log("Hello")
            session = req.session ;
            session.user_id = ID ;
            // console.log(session.user_id) ;
            session.save() ;
            return res.status(200).json({message :"Credentials are correct", id: session.user_id});
        }
    } catch (error) {
        console.error("from here",error.message);
        res.status(401).json({message :"Invalid Id or Password"}) ;
    }
}

const register = async(req, res) => {
    try {
        const { ID, hashed_password } = req.body;
        const user = await pool.query(queries.checkidexists, [ID]);
        if (user.rows.length != 0) {
            return res.status(401).json({message :"User already exists"});
        }

        const saltRound = 10 ; 
        const salt = await bcrypt.genSalt(saltRound) ;

        const bcryptPassword = await bcrypt.hash(hashed_password, salt) ;

        
        const newuser = pool.query(queries.adduser, [ID, bcryptPassword]);
        // console.log(newuser.rows) ;
        res.status(200).json({message: "Successfull added"}) ;
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({message :"User"})
    }
};

const verify = async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"Server Error"});
    }
};

// HOME PAGE BUSSINESS LOGIC CONTROL
const homestudentdisplay = async(req, res) => {
    try {
        if(req.user){
            const userinfo = await pool.query(queries.homestudentdisplay, [req.user]);
            return res.status(200).json(userinfo.rows[0]);
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    }
};


const studentcurrcourses = async(req, res) => {
    try{
        if(req.user){
            const studentcourse = await pool.query(queries.studentcurrourses, [req.user]) ;
            // console.log(studentcourse.rows) ;
            return res.status(200).json(studentcourse.rows) ;
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    }   
};

// two user function starts here

const sortByYearSemester = (a, b) => {
    order = {'Spring' : 1, 'Summer': 2, 'Fall' : 3, 'Winter' : 4} ;
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return order[b.semester] - order[a.semester];
};

const CoursesTable = (courses) => {
    let coursesByYearSemester = {};
      courses.sort(sortByYearSemester).forEach(course => {
      const key = `${course.year}-${course.semester}`;
      if (!coursesByYearSemester[key]) {
        coursesByYearSemester[key] = [];
      }
      coursesByYearSemester[key].push(course);
    });
    return coursesByYearSemester ;
};

// user function ends here 

const studentprevcourses = async(req, res) => {
    try{
        if(req.user){
            const studentcourse = await pool.query(queries.studentprevcourses, [req.user]) ;
            result = CoursesTable(studentcourse.rows) ;
            return res.status(200).json(result) ;
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    }
};

const totalcredits = async(req, res) => {
    try{
        if(req.user){
            const response = await pool.query(queries.currsemcredits, [req.user]) ;
            return res.status(200).json(response.rows[0]) ;
        }
        else{
            return res.status(403).json({message : "Login to access this content"})
        }
    }
    catch(error){
        console.error(error.message) ;
        res.status(500).json({message :"server Error"});
    }
};


// COURSES BUSSINESS LOGIC CONTROL 

const alldepartments = async(req, res) => {
    try{
        const alldepartment = await pool.query(queries.alldepartments) ;
        // console.log(alldepartment.rows) ;
        return res.status(200).json(alldepartment.rows)
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({mesasge : "Server error"}) ;
    }
};

const alldeptcourses = async(req, res) => {
    try{
        const department = req.params.dept_name ;
        const allcourse = await pool.query(queries.allcourses, [department]) ;
        // console.log(allcourse.rows) ;
        return res.status(200).json(allcourse.rows) ;
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({mesasge : "Server error"}) ;
    }   
};


const runningdepartments = async(req, res) => {
    try{
        if(req.user){
            const departments = await pool.query(queries.runningdepartments) ;
            // console.log(departments.rows) ;
            return res.status(200).json(departments.rows) ;
        }else{
            return res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.error(error.message);
        res.status(500).json({mesasge : "Server error"}) ;
    }
};

 
const runningdeptcourses = async(req, res) => {
    try {
        if(req.user){
            const department = req.params.dept_name ;
            const departments = await pool.query(queries.runningcourses, [department]) ;
            // console.log(departments.rows) ;
            return res.status(200).json(departments.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    } catch (error) {
        console.error(error.message);
        res.status(403).json({message :"Servor error"});
    }
};


// COURSE PAGES BUSSINESS CONTROL LOGIC 

const courseinfo = async(req, res) => {
    try{
        if(req.user){
            const course_id = req.params.course_id ;
            const course = await pool.query(queries.courseinfo, [course_id]) ;
            // console.log(course.rows) ;
            return res.status(200).json(course.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }
};

const courseprereq = async(req, res) => {
    try{
        if(req.user){
            const course_id = req.params.course_id ;
            const prereq_id = await pool.query(queries.courseprerequisite, [course_id]) ;
            // console.log(prereq_id.rows) ;
            return res.status(200).json(prereq_id.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ; 
    }
};

const currcourseinstructor = async(req, res) => {
    try{
        if(req.user){
            const course_id = req.params.course_id ;
            const instructor = await pool.query(queries.currcourseinstructors, [course_id]) ;
            // console.log(instructor.rows) ;
            return res.status(200).json(instructor.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ; 
    }
};


// INSTRUCTOR PAGE BUSINESS LOGICS
const instructorinfo = async(req, res) => {
    try{
        if(req.user){
            const instructor_id = req.params.instructor_id ;
            const instructor = await pool.query(queries.getinstructorinfo, [instructor_id]) ;
            // console.log(instructor.rows) ;
            return res.status(200).json(instructor.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }
};

const instructorcurrcourses = async(req, res) => {
    try{
        if(req.user){
            const instructor_id = req.params.instructor_id ;
            const courses = await pool.query(queries.getinstructorcurrcourses, [instructor_id]) ;
            // console.log(courses.rows) ;
            return res.status(200).json(courses.rows)
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }
};

const instructorprevcourses = async(req, res) => {
    try{
        if(req.user){
            const instructor_id = req.params.instructor_id ;
            const courses = await pool.query(queries.getinstructorprevcourses, [instructor_id]) ;
            // console.log(courses.rows) ;
            return res.status(200).json(courses.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }
};

// CURRENT SEMESTER
const currentsemester = async(req, res) => {
    try{
        if(req.user){
            const result = await pool.query(queries.currentsemester) ;
            // console.log(result.rows[0]) ;
            return res.status(200).json(result.rows[0]) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }   
};


// REGISTRATION BUSINESS LOGIC 
const registercourse = async(req, res) => {

};

const dropcourse = async(req, res) => {
    try{
        if(req.user){
            const {course_id, sec_id} = req.params;
            const response = await pool.query(queries.dropcourse, [course_id, sec_id]) ;
            // console.log(response.rows) ;
            return res.status(200).json(response.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ;
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;       
    }
};

const searchcourses = async(req, res) => {
    try{
        const {search} = req.params ;
        const response = await pool.query(queries.searchcourses, [search]) ;
        // console.log(response.rows) ;
        return res.status(200).json(response.rows) ;
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;    
    }
}

const checkinstructor = async(req, res) => {
    try{
        if(req.user){
            // console.log(req.user) ;
            const result = await pool.query(queries.checkifinst, [req.user]) ;
            // console.log(result.rows[0]) ;
            return res.status(200).json(result.rows[0]) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ; 
        }
    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;
    }
}

const allstudents = async(req, res) => {
    try{
        if(req.user){
            const result = await pool.query(queries.allstudents) ;
            // console.log(result.rows) ;
            return res.status(200).json(result.rows) ;
        }
        else{
            return  res.status(403).json({message:"Login to get access to this resource."}) ; 
        }

    }
    catch(error){
        console.log(error.message) ;
        res.status(500).json({message : "Servor error"}) ;  
    }
}

const studentinfo = async(req, res) => {
    try {
        if(req.user){
            const id = req.params.id ;
            const userinfo = await pool.query(queries.homestudentdisplay, [id]);
            return res.status(200).json(userinfo.rows[0]);
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    }
}

const prev = async(req, res) => {
    try{
        if(req.user){
            const id = req.params.id 
            const studentcourse = await pool.query(queries.studentprevcourses, [id]) ;
            result = CoursesTable(studentcourse.rows) ;
            // console.log(result) ;
            return res.status(200).json(result) ;
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    }
}

const curr = async(req, res) => {
    try{
        if(req.user){
            const id = req.params.id ;
            const studentcourse = await pool.query(queries.studentcurrourses, [id]) ;
            // console.log(studentcourse.rows) ;
            return res.status(200).json(studentcourse.rows) ;
        }else{
            return res.status(403).json({message:"Login to get access to this resource."})
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message :"server Error"});
    } 
}

const credits = async(req, res) => {
    try{
        if(req.user){
            const id = req.params.id ;
            const response = await pool.query(queries.currsemcredits, [id]) ;
            // console.log(response.rows[0]) ;
            return res.status(200).json(response.rows[0]) ;
        }
        else{
            return res.status(403).json({message : "Login to access this content"})
        }
    }
    catch(error){
        console.log(error.message) ;
    } 
}

module.exports = {
    login,
    register,
    verify,
    currentsemester,
    homestudentdisplay,
    studentprevcourses,
    studentcurrcourses,
    alldepartments,
    runningdepartments, 
    alldeptcourses,
    runningdeptcourses,
    courseinfo,
    courseprereq,
    currcourseinstructor,
    instructorinfo,
    instructorcurrcourses,
    instructorprevcourses,
    dropcourse, 
    registercourse,
    totalcredits,
    searchcourses,
    checkinstructor,    
    allstudents,
    studentinfo,
    prev,
    curr,
    credits
}