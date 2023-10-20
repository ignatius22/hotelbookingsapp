import styled from "styled-components";
import GlobalStyles from "./styles/GlobalSyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

const StyleApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <div>
      <GlobalStyles />
      <StyleApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h2">Checkin and out</Heading>
              <Button >Check in</Button>
              <Button variation="secondary" size="large">Check out</Button>
            </div>
          </Row>
          <Row type="vertical">
            <Heading as="h3">Form</Heading>
            <form>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of guests" />
            </form>
          </Row>
        </Row>
      </StyleApp>
    </div>
  );
}

export default App;
