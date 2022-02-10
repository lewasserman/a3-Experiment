import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function Buttons(props) {

  return (
    <div>
      {props.numPage > 0 ?  
      <Grid justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item>
          <Button onClick={props.changePageBackFcn} variant="contained">Back</Button>
        </Grid>
        <Grid item>
          <Button onClick={props.changePageFcn} variant="contained">Next</Button>
        </Grid>
      </Grid> 
      : 
      <Grid justifyContent={'center'} container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item >
          <Button onClick={props.changePageFcn} variant="contained">Start</Button>
        </Grid>
      </Grid>
      }
    </div>
  );
}

export default Buttons;
