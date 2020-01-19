import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp"
import SearchTutors from "./components/SearchTutors"
import Login from "./components/Login"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import MyCourses from "./components/ProfilePage/MyCourses";
import StudentList from "./components/TutorProfile/StudentList";
import DocList from "./components/TutorProfile/DocList";
import TutorProfile from "./components/TutorProfile/TutorProfile";
import CourseList from './components/CourseList';
import TutorCourses from "./components/TutorProfile/TutorCourses";
import UserDashboard from "./components/UserDashboardPage/UserDashboard";
import UploadDocuments from "./components/Documents/UploadDocuments";
import BlogPost from "./components/BlogPost";
import ViewTutorCourse from "./components/TutorCourseView/ViewTutorCourse";
import TutorCourseView from "./components/TutorCourseView/TutorCourseView";
import Announcements from "./components/TutorAnnouncements/Announcements";
import ResourceLevels from "./components/Resources/ResourceLevels";
import Document from "./components/Documents/Document";
import Studentdocs from './components/ProfilePage/Studentdocs';
import ResourcePage from './components/Resources/ResourcePage';

// This is all the url routing.
function MainPage() {
  return (
    <Router>
      <Route exact path="/" component={Main} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/search" component={SearchTutors} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/courses" component={MyCourses} />
      <Route exact path="/tutor" component={TutorProfile} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:file" component={StudentList} />
      <Route exact path= "/CourseList/:id" component= {CourseList}/>
      <Route exact path= "/tutorCourses/:file" component = {TutorCourses}/>
      <Route exact path= "/tutorCourses" component = {TutorCourses}/>
      <Route exact path="/dashboard" component={UserDashboard} />
      <Route exact path= "/uploadingDocs" component = {UploadDocuments}/>
      <Route exact path= "/Postblog" component={BlogPost} />
      <Route exact path= "/doclist" component={DocList} />
      <Route exact path= "/ViewTutorCourse/:coursename" component={ViewTutorCourse} />
      <Route exact path= "/doclist/:coursename" component={ViewTutorCourse} />
      <Route exact path= "/document/:filename" component={Document} />
      <Route exact path= "/TutorCourseView" component={TutorCourseView} />
      <Route exact path= "/Announcements" component={Announcements} />
      <Route exact path= "/doc" component={Studentdocs} />
      <Route exact path= "/doc/:studentid" component={Studentdocs} />
      <Route exact path= "/resources" component={ResourceLevels} />
      <Route exact path= "/primary" component={ResourcePage} />
      <Route exact path= "/secondary" component={ResourcePage} />
      <Route exact path= "/postsecondary" component={ResourcePage} />
    </Router>
  );
}

// This is the component that will be shown by default
export default MainPage;