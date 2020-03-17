import axios from 'axios';

export function sendNotification(studentsList, tutorInfo, notifInfo){
    axios.post('/api/sendAnnouncementStudents', {
      students: studentsList,
      announcement: {
        title: notifInfo.title,
        text: notifInfo.text,
        tutorName: tutorInfo.tutorName,
        tutorid: tutorInfo.tutorid,
        new: true,
      }
    })
      .then((res) => {
        console.info("New notification sent.");
      }, (error) => {
         console.error("Something went wrong when sending sending an notification (API call error) " + error);
      })
}