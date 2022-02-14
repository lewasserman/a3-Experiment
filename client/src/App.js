import './App.css';
import Introductions from './Pages/Introductions';
import React, { useState, useEffect  } from 'react';
import Buttons from './Components/Buttons';
import ChartArea from './Components/ChartArea';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const [trials, changeTrials] = useState([]);
  const [currentChart, changeCurrentChart] = useState('');

  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  let trial = {
    trialid: '',
    truePercentage: 0,
    repPercentage: 0,
    type: 'barchart',
    participantId: '',
  };

  useEffect(() => {
    if(trials.length === 0){
      trial.participantId = makeid(10);
      trial.trialid = makeid(10);
    } else {
      trial.participantId = trials[trials.length - 1].participantId;
      trial.trialid = makeid(10);;
    }
  });

  const addTrial = () => {
    trial.type = currentChart;
    changeTrials([...trials, trial]);
    console.log(trials);
    changePageFcn();
  }

  const updateChartType = (type) => {
    changeCurrentChart(type);
  }

  const changePageFcn = () => {
    let newPage = page + 1;
    changePage(newPage);
  }

  const changeRepPercentage = (e) => {
    trial.repPercentage = e.target.value;
  }

  return (
    <div className="App-header">
      <header>
        {<Introductions numPage={page} />}
        <div style={{ textAlign: 'center' }}>
          {page > 0 && page < 7 ? <ChartArea updateChartType={updateChartType} /> : null}
        </div>
        {page === 7 ?
          <div style={{ textAlign: 'center' }}>
            <p>Thank for your participation!</p>
          </div>
          :
          <div>
            <Grid style={{ marginTop: "15px" }} justifyContent={'center'} container rowSpacing={2} >
              {page > 0 ? <Grid item>
                <CssTextField
                  onChange={changeRepPercentage}
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
                  changePageFcn={changePageFcn}
                  addTrial={addTrial}
                />
              </Grid>
            </Grid>
          </div>}
      </header>
    </div>
  );
}

export default App;
