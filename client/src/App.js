import './App.css';
import Introductions from './Pages/Introductions';
import React, { useState } from 'react';
import Buttons from './Components/Buttons';

function App() {
  const [page, changePage] = useState(0);

  const changePageFcn = () => {
    let newPage = page + 1;
    changePage(newPage);
  }

  return (
    <div className="App-header">
      <header>
        <Introductions />
        <p>{page > 0 ? page : ""}</p>
        {page === 61 ? <p>End</p> : <Buttons changePageFcn={changePageFcn} />}
      </header>
    </div>
  );
}

export default App;
