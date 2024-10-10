import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [verse, setVerse] = useState('');
  const [reference, setReference] = useState('');

  useEffect(() => {
    const storedVerse = JSON.parse(localStorage.getItem('dailyVerse'));
    const storedDate = localStorage.getItem('verseDate');
    const today = new Date().toDateString();

    if (storedVerse && storedDate === today) {
      setVerse(storedVerse.verse);
      setReference(storedVerse.reference);
    } else {
      fetch('https://labs.bible.org/api/?passage=random&type=json&version=nlt')
        .then(response => response.json())
        .then(data => {
          const newVerse = `"${data[0].text.trim()}"`;
          const newReference = `~ ${data[0].bookname} ${data[0].chapter}:${data[0].verse}`;
          setVerse(newVerse);
          setReference(newReference);
  
          localStorage.setItem('dailyVerse', JSON.stringify({ verse: newVerse, reference: newReference }));
          localStorage.setItem('verseDate', new Date().toDateString());
        })
        .catch(err => console.error(err));
    }
  }, []); 

  return (
    <div className="App">
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
