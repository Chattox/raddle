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
} from './styledComponents';
import { BackspaceIcon } from './icons';
import './App.css';

function App() {
  return (
    <Main>
      <Header>RADDLE</Header>
      <GameSection>
        <TileContainer>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <TileRow key={i}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Tile key={i}></Tile>
              ))}
            </TileRow>
          ))}
        </TileContainer>
      </GameSection>
      <KeyboardSection>
        <KeyboardRow>
          {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map((key) => (
            <KeyboardButton>{key}</KeyboardButton>
          ))}
        </KeyboardRow>
        <KeyboardRow>
          <Flex item={0.5} />
          {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map((key) => (
            <KeyboardButton>{key}</KeyboardButton>
          ))}
          <Flex item={0.5} />
        </KeyboardRow>
        <KeyboardRow>
          {['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'backspace'].map(
            (key) => (
              <KeyboardButton
                flex={['enter', 'backspace'].includes(key) ? 1.5 : 1}
              >
                {key === 'backspace' ? <BackspaceIcon /> : key}
              </KeyboardButton>
            )
          )}
        </KeyboardRow>
      </KeyboardSection>
    </Main>
  );
}

export default App;
