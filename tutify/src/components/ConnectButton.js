import React, { Component } from 'react';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';

const assignTutor = (e, userID, tutorID, url) => {
    axios.post('/api/assignTutor', {
        student_id: userID,
        tutor_id: tutorID,
    })
    swal("Succesfully connected with tutor!", "", "success")
      .then((value) => {
          window.location = url;
      });
}

export default function ConnectButton(props) {
    const isConnected = props.isConnected;
    const tutor = props.tutor;
    var url = "/courselist/" + props.tutor._id;
    if (!isConnected) {
        return <Button variant="outlined" onClick={event => assignTutor(event, props.userId, props.tutor._id, url)} >Connect with {tutor.first_name}</Button>
    }
    return <Button variant="outlined" disabled >Connected <CheckIcon /></Button>
}