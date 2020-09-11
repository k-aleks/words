import React from 'react';
import styles from './App.css';
import SearchIcon from '@skbkontur/react-icons/Search'
import AddIcon from '@skbkontur/react-icons/Add'
import RemoveIcon from '@skbkontur/react-icons/Remove'
import { Button, Input } from '@skbkontur/react-ui';
import { getWords, addNewWord, incrementScore } from './storage/dynamo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newWord: '',
      words: []
    };
    this.onNewWordInputChange = this.onNewWordInputChange.bind(this);
    this.onWordAddButtonClick = this.onWordAddButtonClick.bind(this);
    this.readWordsFromDatabase = this.readWordsFromDatabase.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  async componentDidMount() {
    await this.readWordsFromDatabase();
  }

  render() {
    const links = this.state.words.map(w => (
      <div className='wordDiv' key={w.word}>
        <a className='searchLink' href={`${searchLink}${encode(w.word)}`}>{w.word}</a>
        <span className='score'>{w.score}</span>
        <span className='plusMinusButtons'>
          <span className='button' >
            <Button icon={<AddIcon />} use='link' onClick={() => this.updateScore(w, 1)} />
          </span>
          <span className='button' >
            <Button icon={<RemoveIcon />} use='link' onClick={() => this.updateScore(w, -1)} />
          </span>
        </span>
        <a className='exampleLink' href={`${googleLink}"${encode(w.word)}"`}>
          <SearchIcon />
        </a>
      </div>
    ));

    return (
      <div>
        <div className='inputBlock'>
          <div>
            <span>
              <Input className='input' size='medium' onValueChange={this.onNewWordInputChange} value={this.state.newWord} />
            </span>
            <span className='addButton'>
              <Button icon={<AddIcon />} use='default' onClick={this.onWordAddButtonClick}>add word</Button>
            </span>
          </div>
          <div className='inputLink'>
            <a href={`${searchLink}${encode(this.state.newWord)}`}>{this.state.newWord}</a>
          </div>
        </div>
        <div className='wordsList'>
          {links}
        </div>
      </div>
    );
  }

  async updateScore(word, inc) {
    await incrementScore(word, inc);
    await this.readWordsFromDatabase();
  }

  async readWordsFromDatabase() {
    const words = await getWords();
    words.sort((a, b) => a.score - b.score);
    this.setState({ words });
  }

  onNewWordInputChange(value) {
    this.setState({ newWord: value })
  }

  async onWordAddButtonClick() {
    const newWord = this.state.newWord;
    console.log('Adding new word: ' + newWord);
    await addNewWord(newWord);
    this.setState({ newWord: '' })
    await this.readWordsFromDatabase();
  }
}


const encode = (str) => {
  return encodeURI(str);
}

const searchLink = 'https://www.macmillandictionary.com/search/british/direct/?q='
const googleLink = 'https://www.google.com/search?tbm=nws&q='

const words = [
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
