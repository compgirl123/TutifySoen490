import React from 'react';
import Button from '@material-ui/core/Button';

export default function EnrollButton(props) {
    const isConnected = props.isConnected;
    var url = "/courselist/" + props.tutor._id;
    if (isConnected) {
        return <Button component="a" href={url} variant="outlined" style={{marginLeft: '10px'}} >Enroll in courses</Button>
    }
    return <></>
}