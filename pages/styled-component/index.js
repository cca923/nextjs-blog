import styled, { ThemeProvider } from "styled-components";

import Layout from "../../components/Layout";

const Button = styled.button`
  color: ${(props) => props.theme.fg};
  border: 2px solid ${(props) => props.theme.fg};
  background: ${(props) => props.theme.bg};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;

const theme = {
  fg: "palevioletred",
  bg: "white",
};

const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg,
});

export default function StyledComponent() {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div>
          <Button>Default Theme</Button>

          <ThemeProvider theme={invertTheme}>
            <Button>Inverted Theme</Button>
          </ThemeProvider>
        </div>
      </ThemeProvider>
    </Layout>
  );
}
