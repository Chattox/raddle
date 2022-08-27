import {
  Main,
  Header,
  GameSection,
  TileContainer,
  TileRow,
  Tile,
  KeyboardSection,
  KeyboardRow,
  KeyboardButton,
  Flex,
  Heading,
} from './styledComponents';
import { BackspaceIcon } from './icons';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const RAND_WORD_URL =
  'https://random-word-api.herokuapp.com/word?length=5&lang=en';
const VERIFY_WORD_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const keyboardRows = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'],
];

const allKeys = keyboardRows.flat();

const wordLength = 5;

function App() {
  const [guesses, setGuesses] = useState({
    0: Array.from({ length: wordLength }).fill(''),
    1: Array.from({ length: wordLength }).fill(''),
    2: Array.from({ length: wordLength }).fill(''),
    3: Array.from({ length: wordLength }).fill(''),
    4: Array.from({ length: wordLength }).fill(''),
    5: Array.from({ length: wordLength }).fill(''),
  });
  const [markers, setMarkers] = useState({
    0: Array.from({ length: wordLength }).fill(''),
    1: Array.from({ length: wordLength }).fill(''),
    2: Array.from({ length: wordLength }).fill(''),
    3: Array.from({ length: wordLength }).fill(''),
    4: Array.from({ length: wordLength }).fill(''),
    5: Array.from({ length: wordLength }).fill(''),
  });
  const [targetWord, setTargetWord] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(RAND_WORD_URL, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setTargetWord(res[0]));
  }, []);

  let letterIndex = useRef(0);
  let round = useRef(0);

  const publish = (pressedKey) => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex < wordLength) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex] = pressedKey.toLowerCase();
        return newGuesses;
      });

      letterIndex.current = _letterIndex + 1;
    }
  };

  const erase = () => {
    const _letterIndex = letterIndex.current;
    const _round = round.current;

    if (_letterIndex > 0) {
      setGuesses((prev) => {
        const newGuesses = { ...prev };
        newGuesses[_round][_letterIndex - 1] = '';
        return newGuesses;
      });

      letterIndex.current = _letterIndex - 1;
    }
  };

  const enterGuess = async (pressedKey) => {
    if (pressedKey === 'enter' && !guesses[round.current].includes('')) {
      const validWord = await fetchWord(guesses[round.current].join(''));

      if (Array.isArray(validWord)) {
        submit();
      }
    } else if (pressedKey === 'backspace') {
      erase();
    } else if (pressedKey !== 'enter') {
      publish(pressedKey);
    }
  };

  const submit = () => {
    const _round = round.current;
    const updatedMarkers = { ...markers };

    const tempWord = targetWord.split('');

    const leftoverIndices = [];

    tempWord.forEach((letter, i) => {
      const guessedLetter = guesses[_round][i];

      if (guessedLetter === letter) {
        updatedMarkers[_round][i] = 'green';
        tempWord[i] = '';
      } else {
        leftoverIndices.push(i);
      }
    });

    if (updatedMarkers[_round].every((guess) => guess === 'green')) {
      setMarkers(updatedMarkers);
      win();
      return;
    }

    if (leftoverIndices.length) {
      leftoverIndices.forEach((i) => {
        const guessedLetter = guesses[_round][i];
        const correctPositionOfLetter = tempWord.indexOf(guessedLetter);
        console.log('LETTER: ' + guessedLetter);

        console.log(tempWord + ' ' + correctPositionOfLetter + ' ' + i);
        if (tempWord.includes(guessedLetter) && correctPositionOfLetter !== i) {
          console.log('YELLOW');
          updatedMarkers[_round][i] = 'yellow';
          tempWord[correctPositionOfLetter] = '';
        } else {
          console.log('GREY');
          updatedMarkers[_round][i] = 'grey';
        }
      });
    }

    setMarkers(updatedMarkers);
    round.current = _round + 1;
    letterIndex.current = 0;
  };

  const win = () => {
    document.removeEventListener('keydown', handleKeyDown);
    setModalVisible(true);
  };

  const fetchWord = (word) => {
    return fetch(`${VERIFY_WORD_URL}/${word}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  const handleClick = (key) => {
    const pressedKey = key.toLowerCase();

    enterGuess(pressedKey);
  };

  const handleKeyDown = (e) => {
    const pressedKey = e.key.toLowerCase();

    if (allKeys.includes(pressedKey)) {
      enterGuess(pressedKey);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <>
      <Main>
        <Header>RADDLE</Header>
        <GameSection>
          <TileContainer>
            {Object.values(guesses).map((word, wordIndex) => (
              <TileRow key={wordIndex}>
                {word.map((letter, i) => (
                  <Tile key={i} hint={markers[wordIndex][i]}>
                    {letter}
                  </Tile>
                ))}
              </TileRow>
            ))}
          </TileContainer>
        </GameSection>
        <KeyboardSection>
          {keyboardRows.map((keys, i) => (
            <KeyboardRow key={i}>
              {i === 1 && <Flex item={0.5} />}
              {keys.map((key) => (
                <KeyboardButton
                  key={key}
                  onClick={() => handleClick(key)}
                  flex={['enter', 'backspace'].includes(key) ? 1.5 : 1}
                >
                  {key === 'backspace' ? <BackspaceIcon /> : key}
                </KeyboardButton>
              ))}
              {i === 1 && <Flex item={0.5} />}
            </KeyboardRow>
          ))}
        </KeyboardSection>
      </Main>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Heading>You win!</Heading>
      </Modal>
    </>
  );
}

export default App;
