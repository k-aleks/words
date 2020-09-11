import React from 'react';
import './App.css';
import SearchIcon from '@skbkontur/react-icons/Search'
import AddIcon from '@skbkontur/react-icons/Add'
import RemoveIcon from '@skbkontur/react-icons/Remove'
import { Button } from '@skbkontur/react-ui';
import { getWords } from './storage/dynamo';

class App extends React.Component {
  constructor() {
    super();
    this.state = { words: [] };
  }

  async componentDidMount() {
    const words = await getWords();
    this.setState({ words });
  }

  render() {
    const links = this.state.words.map(w => (
      <div class='wordDiv'>
        <a class='searchLink' href={`${searchLink}${encode(w.word)}`}>{w.word}</a>
        <span class='plusMinusButtons'>
          <span class='button' >
            <Button icon={<AddIcon />} use='link' />
          </span>
          <span class='button' >
            <Button icon={<RemoveIcon />} use='link' />
          </span>
        </span>
        <a class='exampleLink' href={`${googleLink}"${encode(w.word)}"`}>
          <SearchIcon />
        </a>
      </div>
    ));

    return (
      <div class='wordsList'>
        {links}
      </div>
    );
  }
}

const encode = (str) => {
  return encodeURI(str);
}

const searchLink = 'https://www.macmillandictionary.com/search/british/direct/?q='
const googleLink = 'https://www.google.com/search?tbm=nws&q='

const words = [
  "scratch out",
  "beef up",
  "pitch",
  "pun",
  "impasse",
  "leftover",
  "shortcoming",
  "fuss",
  "entail",
  "be intended for",
  "puzzle out",
  "puzzle over",
  "get across",
  "bits and bobs",
  "head for",
  "undertake",
  "outline",
  "the nuts and bolts",
  "remainder",
  "holistic",
  "yield",
  "factor in",
  "intricate",
  "wrt",
  "lmk",
  "resent"
]

export default App;
