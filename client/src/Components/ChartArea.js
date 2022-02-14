import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BarChart from './BarChart';
import PieChart from './PieChart';



function ChartArea() {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {

  },[]);

  let charts = [ <BarChart />, <PieChart /> ];
  
  return (
    <div>
      <Grid justifyContent={'center'} container rowSpacing={1} columnSpacing={{ xs: 3, sm: 5, md: 5 }}>
        <Grid item>
          <Item>
            {charts[Math.floor(Math.random() * charts.length)]}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChartArea;
