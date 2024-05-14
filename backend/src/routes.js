// here we store the students routes doubt do I need to have route.js for each component controller.js for each component?

const { Router } = require('express');
const controller = require('./Controllers/controller.js');
const validinfo = require('./middleware/validinfo.js');
// check authorization file 
const authorization = require('./middleware/authorization.js');

const router = Router();

// add authorization every where later excpet at login 
// router.get("/students",authorization, controller.getstudents);
// router.get("/home/:id/",authorization, controller.getstudentsinfo);
// router.get("/home/status/:id",authorization, controller.getstudentscourse);

// login and register routes
router.get("/isverify", authorization, controller.verify); // done
router.post("/register",validinfo, controller.register); // done
router.post("/login/", validinfo, controller.login); // done

// home display routes 
router.get("/home/studentdisplay/", authorization, controller.homestudentdisplay);
router.get("/home/studentprevcourses", authorization, controller.studentprevcourses) ;
router.get("/home/studentcurrcourses", authorization,controller.studentcurrcourses);
router.get("/home/studentcredits/", authorization, controller.totalcredits) ;

// course info routes 
router.get("/home/courses/", authorization, controller.alldepartments);
router.get("/home/courses/:dept_name/", authorization, controller.alldeptcourses);
router.get("/course/running/", authorization, controller.runningdepartments) ;
router.get("/course/running/:dept_name/", authorization, controller.runningdeptcourses) ;

// course page info routes
router.get("/course/:course_id/",authorization, controller.courseinfo);
router.get("/course/prereq/:course_id/", authorization, controller.courseprereq);
router.get("/course/currinstructors/:course_id/", authorization, controller.currcourseinstructor) ;

// instructor page info 
// router.put("/home/registration/register",authorization, controller.registercourse);
// router.delete("/home/registration/drop",authorization, controller.dropcourse);

// instructor page routes 
router.get("/instructor/:instructor_id/",authorization, controller.instructorinfo);
router.get("/instructor/currcourses/:instructor_id/", authorization, controller.instructorcurrcourses) ;
router.get("/instructor/prevcourses/:instructor_id", authorization, controller.instructorprevcourses) ;


router.get("/currentsemester/", authorization, controller.currentsemester) ;

// // registraion page routes doubtfull 
router.delete("/home/dropcourse/:course_id/:sec_id", authorization, controller.dropcourse) ;
router.get("/home/registration/",authorization, controller.registercourse);
router.get("/home/searchcourses/", authorization, controller.searchcourses) ;


router.get("/checkinstructor/", authorization, controller.checkinstructor) ;
router.get("/allstudents/", authorization, controller.allstudents) ;

router.get("/student/:id/", authorization, controller.studentinfo) ;
router.get("/student/prev/:id", authorization, controller.prev) ;
router.get("/student/curr/:id", authorization, controller.curr) ;
router.get("/student/credits/:id", authorization, controller.credits) ;

module.exports = router;