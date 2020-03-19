import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp"
import SearchTutors from "./components/SearchTutors"
import Login from "./components/Login"
import ProfilePage from "./components/ProfilePage/ProfilePage"
import StudentList from "./components/ProfilePage/Tutor/StudentList";
import TutorList from "./components/ProfilePage/TutorList";
import DocList from "./components/ProfilePage/Tutor/DocList";
import CourseList from './components/CourseList';
import MyCourses from "./components/CourseView/MyCourses";
import UserDashboard from "./components/UserDashboardPage/UserDashboard";
import UploadDocuments from "./components/Documents/UploadDocuments";
import BlogPost from "./components/BlogPost";
import ViewCourse from "./components/CourseView/ViewCourse";
import Announcements from "./components/TutorAnnouncements/Announcements";
import ResourceLevels from "./components/Resources/ResourceLevels";
import Document from "./components/Documents/Document";
import Studentdocs from './components/ProfilePage/Studentdocs';
import Tutordocs from './components/ProfilePage/Tutordocs';
import TutorVideos from './components/VideoPage/VideoPage';
import ChooseTutorVideos from './components/VideoPage/ChooseTutorVideoPage';
import ChooseTutorQuizzes from './components/Quiz/ChooseTutorForQuizzes';
import ResourcePage from './components/Resources/ResourcePage';
import PrivateRoute from './components/PrivateRoute';
import MainRoute from './components/MainRoute';
import NotFoundPage from './components/NotFoundPage';
import ForgotPassword from './components/ResetPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Quizzes from './components/Quiz/Questions';
import grades from './components/Quiz/grades';
import ChooseCourseAndQuiz from './components/Quiz/ChooseCourseAndQuiz';
import TutorPublicProfilePage from "./components/ProfilePage/Tutor/TutorPublicProfile/TutorPublicProfilePage";
import TrophiesView from './components/TrophiesView/TrophiesView';

// This is all the url routing.
function MainPage() {
  return (
    <Router>
      <Switch>
        <MainRoute exact path="/" component={Main} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:token" component={ResetPassword} />
        <Route exact path="/profile/:id" component={TutorPublicProfilePage} />
        <PrivateRoute exact path="/search" component={SearchTutors} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/students" component={StudentList} />
        <PrivateRoute exact path="/students/:file" component={StudentList} />
        <PrivateRoute exact path="/courseList/:id" component={CourseList} />
        <PrivateRoute exact path="/tutorCourses/:file" component={MyCourses} />
        <PrivateRoute exact path="/courses" component={MyCourses} />
        <PrivateRoute exact path="/dashboard" component={UserDashboard} />
        <PrivateRoute exact path="/uploadingDocs" component={UploadDocuments} />
        <PrivateRoute exact path="/postblog" component={BlogPost} />
        <PrivateRoute exact path="/doclist" component={DocList} />
        <PrivateRoute exact path="/viewCourse/:coursename" component={ViewCourse} />
        <PrivateRoute exact path="/document/:filename" component={Document} />
        <PrivateRoute exact path="/announcements" component={Announcements} />
        <PrivateRoute exact path="/doc" component={Studentdocs} />
        <PrivateRoute exact path="/doc/:studentid" component={Studentdocs} />
        <PrivateRoute exact path="/resources" component={ResourceLevels} />
        <PrivateRoute exact path="/primary" component={ResourcePage} />
        <PrivateRoute exact path="/secondary" component={ResourcePage} />
        <PrivateRoute exact path="/postsecondary" component={ResourcePage} />
        <PrivateRoute exact path="/tutors" component={TutorList} />
        <PrivateRoute exact path="/tutors/:file" component={TutorList} />
        <PrivateRoute exact path="/courseList/:id" component={CourseList} />
        <PrivateRoute exact path="/tutorCourses/:file" component={MyCourses} />
        <PrivateRoute exact path="/tutdoc" component={Tutordocs} />
        <PrivateRoute exact path="/videos" component={TutorVideos} />
        <PrivateRoute exact path="/videos/:id" component={TutorVideos} />
        <PrivateRoute exact path="/choosetutorVideo" component={ChooseTutorVideos} />
        <PrivateRoute exact path="/quiz" component={Quizzes} />
        <PrivateRoute exact path="/grades" component={grades} />
        <PrivateRoute exact path="/quizResults" component={QuizResults} />
        <PrivateRoute exact path="/trophies" component={TrophiesView} />
        <PrivateRoute exact path="/choosetutorQuiz/:id" component={ChooseTutorQuizzes} />
        <PrivateRoute exact path="/choosetutorQuiz" component={ChooseTutorQuizzes} />
        <PrivateRoute exact path="/chooseClassAndQuiz" component={ChooseCourseAndQuiz} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

// This is the component that will be shown by default
export default MainPage;