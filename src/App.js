import React, { useState } from 'react';
import './App.css';

function App() {
  const [verse, setVerse] = useState('');
  const [reference, setReference] = useState('');

  const fetchVerse = () => {
    fetch('https://labs.bible.org/api/?passage=random&type=json&version=nlt')
      .then(response => response.json())
      .then(data => {
        setVerse(`"${data[0].text.trim()}"`); // Using .trim() to remove any extra spaces
        setReference(`~ ${data[0].bookname} ${data[0].chapter}:${data[0].verse}`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>Random Bible Verse Generator</h1>
      <button onClick={fetchVerse}>Get a Bible Verse</button>
      {verse && (
        <div className="verse-container">
          <p className="verse-text">{verse}</p>
          <p className="verse-reference">{reference}</p>
        </div>
      )}
    </div>
  );
}

export default App;
