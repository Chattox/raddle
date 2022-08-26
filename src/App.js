import styled from 'styled-components';
import './App.css';

const Main = styled.main`
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 100%;

  border-bottom: 1px solid #3a3a3c;
  margin-bottom: 20px;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

const GameSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const TileContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;

  height: 420px;
  width: 350px;
`;

const TileRow = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
`;

const Tile = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #3a3a3c;
  border-radius: 5px;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;
`;

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
    </Main>
  );
}

export default App;
