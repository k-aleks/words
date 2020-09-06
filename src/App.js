import React from 'react';
import './App.css';

function App() {
  const links = words.map(w => (
    <div class='wordDiv'>
      <a href={`${searchLink}${encode(w)}`}>{w}</a>
    </div>
  ));
  return (
    <div class='wordsListDiv'>
      {links}
    </div>
  );
}

const encode = (str) => {
  return encodeURI(str);
}

const searchLink = 'https://www.macmillandictionary.com/search/british/direct/?q='

const words = [
  "scratch out",
  "beef up",
  "pitch",
  "pun"
]

export default App;
