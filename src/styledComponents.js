import styled from 'styled-components';

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
  margin-bottom: 20px;
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
  border-radius: 4px;
  font-size: 3.2rem;
  font-weight: bold;
  line-height: 3.2rem;
  text-transform: uppercase;

  ${({ hint }) => {
    if (hint === 'green') {
      return `background-color: #6aaa64;`;
    }
    if (hint === 'yellow') {
      return `background-color: #b59f3b;`;
    }
    if (hint === 'grey') {
      return `background-color: #3a3a3c;`;
    }
  }}

  transition: background-color 0.5s ease;
`;

const KeyboardSection = styled.section`
  height: 200px;
  width: 95%;
  display: flex;
  flex-direction: column;
`;

const KeyboardRow = styled.div`
  width: 100%;
  margin: 0 auto 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const KeyboardButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1;
  margin: 0 6px 0 0;
  height: 58px;
  ${({ item }) => (item ? `flex: ${item};` : `flex: 1;`)}

  border 0;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  color: #d7dadc;

  ${({ spent }) => {
    if (spent === true) {
      return `background-color: #3a3a3c;`;
    } else {
      return `background-color: #818384;`;
    }
  }}

  transition: background-color 0.5s ease;

  cursor: pointer;
  user-select: none;

  &:last-of-type {
    margin: 0;
  }
`;

const Flex = styled.div`
  ${({ item }) => `flex: ${item};`}
`;

const Heading = styled.h2`
  border-bottom: 1px solid #3a3a3c;
  padding-bottom: 8px;

  font-weight: 700;
  font-size: 3.6rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  margin: 16px auto;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 2px solid 3a3a3c;

  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: #818384;
  }
`;

export {
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
  Row,
  Button,
};
