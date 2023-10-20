import styled from "styled-components";
import GlobalStyles from "./styles/GlobalSyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyleApp = styled.main`
  background-color: var(--color-grey-200);
  padding: 20px;
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <StyleApp>
        <Heading as="h1">The Wild Oasis</Heading>

        <Heading as="h3">Form</Heading>
        <Input type="number" placeholder="Number of guests" />

        <Heading as="h2">Book Now</Heading>
        <Button>Checkin</Button>
        <Button style={{ backgroundColor: "black" }}>Checkin</Button>
      </StyleApp>
    </div>
  );
}

export default App;
