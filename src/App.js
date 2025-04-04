import React, { useEffect } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider } from './context/dataContext';
import './App.css';
import sound from './assests/music.mp3'



function App() {
  useEffect(()=>{
     new Audio(sound).play();  
  },[])
  return (
    <div className="App-header">
      <DataProvider>
        {/* Welcome Page */}
        <Start/>
  
        {/* Quiz Page */}
        <Quiz/>
  
        {/* Result Page */}
        <Result/>
      </DataProvider>
    </div>
  );
}

export default App;
