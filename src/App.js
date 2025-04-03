import React from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { DataProvider } from './context/dataContext';
import './App.css';

function App() {
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
