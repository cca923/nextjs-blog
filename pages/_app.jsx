// import "../styles/global.css";

import { Provider } from 'react-redux'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

// import configureStore from "../redux/store"; // No reduxjs/toolkit
import store, { initStore } from '../redux/store' // reduxjs/toolkit

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  display: block;
}
`

const theme = {
  colors: {
    primary: '#0a9396',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {/* <Provider store={configureStore()}> */}
        <Provider store={initStore()}>
          <Component {...pageProps} />
        </Provider>
        {/* </Provider> */}
      </ThemeProvider>
    </>
  )
}

// This App component is the top-level component which will be common across all the different pages.
// You can use this App component to keep state when navigating between pages.

// Important: You need to restart the development server when you add pages/_app.js.
