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
import UploadDocuments from "./components/UploadDocuments/UploadDocuments";
import BlogPost from "./components/BlogPost";
import ViewCourse from "./components/StudentCourseView/ViewCourse";
import TutorCourseView from "./components/TutorCourseView/TutorCourseView";
import Announcements from "./components/TutorAnnouncements/Announcements";
import ResourceLevels from "./components/Resources/ResourceLevels";

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
      <Route exact path= "/CourseList/:id" component= {CourseList}/>
      <Route exact path= "/tutorCourses" component = {TutorCourses}/>
      <Route exact path="/dashboard" component={UserDashboard} />
      <Route exact path= "/uploadingDocs" component = {UploadDocuments}/>
      <Route exact path= "/Postblog" component={BlogPost} />
      <Route exact path= "/doclist" component={DocList} />
      <Route exact path= "/ViewCourse" component={ViewCourse} />
      <Route exact path= "/TutorCourseView" component={TutorCourseView} />
      <Route exact path= "/Announcements" component={Announcements} />
      <Route exact path= "/resources" component={ResourceLevels} />
    </Router>
  );
}

// This is the component that will be shown by default
export default MainPage;