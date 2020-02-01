var express = require('express');
var router = express.Router();
var session = require('express-session');


// Controllers
var accountController = require('./controllers/account.controller')
var appointmentController = require('./controllers/appointment.controller')
var tutorController = require('./controllers/tutor.controller')
var userController = require('./controllers/user.controller')
var courseController = require('./controllers/course.controller')
var filesController = require('./controllers/files.controller')
var uploadedFilesController = require('./controllers/uploaded_files.controller')
var resourceController = require('./controllers/resource.controller')

// -------- TUTOR ROUTES --------- // 

router.get('/getTutors', tutorController.getTutors);

router.get('/getTutor', tutorController.getTutor);

router.post('/updateTutor', tutorController.updateTutor);

router.post('/updateTutorInfo', tutorController.updateTutorInfo);

router.get('/getTutorCourses', tutorController.getTutorCourses);

router.post('/addEvent', tutorController.addEvent);

router.post('/populateEvents', tutorController.populateEvents);

router.post('/deleteEvent', tutorController.deleteEvent);

// -------- USER ROUTES --------- // 

router.get('/getUser', userController.getUser);

router.post('/findStudents', userController.findStudents);

router.post('/updateUserInfo', userController.updateUserInfo);

router.post('/putUser', userController.putUser);

router.post('/deleteUser', userController.deleteUser);

router.post('/authUser', userController.authUser);

router.get('/logout', userController.logout);

router.get('/checkSession', userController.checkSession);

router.post('/assignTutor', userController.assignTutor);

router.post('/assignCourse', userController.assignCourse);

router.get('/getUserCourses', userController.getUserCourses);

router.post('/updateUserTodos', userController.updateUserTodos);

router.post('/sendAnnouncementStudents', userController.sendAnnouncementStudents);

router.post('/deleteNotification', userController.deleteNotification);

// -------- ACCOUNT ROUTES --------- // 

router.get('/getAccount', accountController.getAccount);

router.post('/updateAccount', accountController.updateAccount);

router.post('/putAccount', accountController.putAccount);

router.delete('/deleteAccount', accountController.deleteAccount);

// -------- APPOINTMENT ROUTES --------- // 

router.get('/getAppointment', appointmentController.getAppointment);

router.post('/updateAppointment', appointmentController.updateAppointment);

router.post('/putAppointment', appointmentController.putAppointment);

router.delete('/deleteAppointment', appointmentController.deleteAppointment);

// -------- COURSES ROUTES --------- // 

router.get('/getCourses', courseController.getCourses);

router.post('/addTutorToCourse', courseController.addTutorToCourse);

router.post('/addCourseToDb', courseController.addCourseToDb);

// -------- Files ROUTES --------- // 

router.get('/getFile/:filename', filesController.getFile);

router.post("/files/del/:id", filesController.deleteFile);

router.get('/uploadFile', uploadedFilesController.populateUploadedFiles);

router.get('/uploadingDocs', uploadedFilesController.getLatestUpload);

router.post('/tutorCourses/:file', uploadedFilesController.assignCourse);

router.post('/students/:file', uploadedFilesController.assignCourseStudent);

router.get('/doc', uploadedFilesController.viewDocs);

router.get('/viewCourse/:coursename', uploadedFilesController.viewCourseDocs);

router.get('/doc/:studentid',uploadedFilesController.viewSpecificStudentFiles);

// -------- DELETE FILES ROUTES --------- // 

router.post('/getFileToDelete', uploadedFilesController.deleteFiles);

router.post('/getSpecificStudentsFilestoDelete', uploadedFilesController.deleteSpecificStudentsFiles);

router.post('/getSpecificCourseFilestoDelete', uploadedFilesController.deleteSpecificCourseFiles);

// -------- RESOURCES --------- // 

router.get('/getResources', resourceController.getResources);

router.post('/addResource', resourceController.addResource);

module.exports = router;
