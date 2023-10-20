import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: red;
  background-color: black;
`;

const Button = styled.button`
  font-size: 23px;
  padding: 5px 20px;
  background-color: green;
  color: white;
  border-radius: 7px;
  border: none;
`;

function App() {
  return (
    <div>
      <H1>The Wild Oasis</H1>
      <Button>Checkin</Button>
      <Button style={{ backgroundColor: "black" }}>Checkin</Button>
    </div>
  );
}

export default App;
