import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Buttons(props) {

  return (
    <div style={{ textAlign: 'center' }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Button onClick={props.changePageFcn} variant="contained">Left</Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained">Right</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Buttons;
