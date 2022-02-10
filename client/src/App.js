import './App.css';
import Introductions from './Pages/Introductions';
import React, { useState } from 'react';
import Buttons from './Components/Buttons';
import ChartArea from './Components/ChartArea';

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
        <Introductions />
        <div style={{textAlign: 'center'}}>
          {page > 0 ? <ChartArea/> : null}
        </div>
        {page === 61 ? 
        <p>End</p> 
        :
        <Buttons 
        numPage={page} 
        changePageBackFcn={changePageBackFcn} 
        changePageFcn={changePageFcn} />}
      </header>
    </div>
  );
}

export default App;
