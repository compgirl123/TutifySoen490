import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';



export default function TransitionsSnackbar() {
  const [state] = React.useState({
    Transition: Fade,
  });

  return (
    <div>
      <Snackbar
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  );
}