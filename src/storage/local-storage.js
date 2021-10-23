
const STORAGE_KEY = 'words';

export async function getWords() {
    const wordsString = localStorage.getItem(STORAGE_KEY);
    if (wordsString) {
        const words = JSON.parse(wordsString);
        return words;
    }
    return [];
}

function setWords(words) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export async function addNewWord(newWord) {
    const words = await getWords();
    words.push({
        word: newWord,
        score: 0
    });
    setWords(words);
}

export async function incrementScore(wordToUpdate, inc) {
    const words = await getWords();
    const wordElementToUpdate = words.find(w => w.word == wordToUpdate.word);
    wordElementToUpdate.score += inc;
    setWords(words);
}
