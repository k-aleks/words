const words = [];

export async function getWords() {
    return words;
}

export async function addNewWord(newWord) {
    words.push({
        word: newWord,
        score: 0
    });
}

export async function incrementScore(wordToUpdate, inc) {
    const wordElementToUpdate = words.find(w => w.word == wordToUpdate.word);
    wordElementToUpdate.score += inc;
}
