import React from 'react';
import './App.css';

import JoditEditor from './components/jodit/JoditEditor'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jodit</h1>
      </header>
      <body className="App-body">
        <JoditEditor />
      </body>
      <footer className="App-footer">
        <h3>Jodit is awesome</h3>
      </footer>
    </div>
  );
}

export default App;
