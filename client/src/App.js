import './App.css';
import Introductions from './Pages/Introductions';
import React, { useState } from 'react';
import Buttons from './Components/Buttons';
import ChartArea from './Components/ChartArea';
import { Grid, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  // change color of label to white
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-placeholder': {
    color: 'white',
  },
  '& label.Mui-focusVisible': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

function App() {
  const [page, changePage] = useState(0);

  const changePageFcn = () => {
    let newPage = page + 1;
    changePage(newPage);
  }

  const changePageBackFcn = () => {
    let newPage = page - 1;
    changePage(newPage);
  }

  return (
    <div className="App-header">
      <header>
        {<Introductions numPage={page} />}
        <div style={{ textAlign: 'center' }}>
          {page > 0 ? <ChartArea /> : null}
        </div>
        {page === 61 ?
          <p>End</p>
          :
          <div>
            <Grid style={{ marginTop: "15px" }} justifyContent={'center'} container rowSpacing={2} >
              {page > 0 ? <Grid item>
                <CssTextField
                  label="Percentage of Difference"
                  InputLabelProps={
                    {
                      style: {
                        color: 'white',
                      },
                    }
                  }
                  id="custom-css-outlined-input" />
              </Grid> : <></>}
              <Grid item xs={12}>
                <Buttons
                  numPage={page}
                  changePageBackFcn={changePageBackFcn}
                  changePageFcn={changePageFcn} />
              </Grid>
            </Grid>
          </div>}
      </header>
    </div>
  );
}

export default App;
