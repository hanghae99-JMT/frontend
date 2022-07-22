import logo from './logo.svg';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { ThemeProvider } from '@mui/material';
import {theme} from "./Styles.js"
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme = {theme}>
        <Routes>
          <Route path="/*" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
