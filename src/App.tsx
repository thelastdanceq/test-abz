import { createTheme, ThemeProvider } from '@mui/material';
import Nav from './components/Nav';
import PostBlock from './components/PostBlock/PostBlock';
import SignIn from './components/SignInBlock';
import UserBlock from './components/UserBlock/UserBlock';
const theme = createTheme({
  palette: {
    primary: {
      main: "#F4E041",
      light: "#FFE302"
    },
    secondary: {
      main: "#00BDD3",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App app">
        <Nav />
        <SignIn />
        <UserBlock />
        <PostBlock />
      </div>
    </ThemeProvider >

  );
}

export default App;
