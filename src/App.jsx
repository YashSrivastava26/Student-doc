import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotesState from './context/notes/NotesState';
import Home from './components/Home';
import Alerts from './components/Alerts';
import Docs from './components/Docs';
import Notes from './components/Notes';
import About from './components/About';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <NotesState>
      <BrowserRouter>
         <Navbar /> 
         {/* <Alerts />  */}
         <Routes>
          <Route exact path='/sign-in' element={<SignIn/>}></Route>
          <Route exact path='/sign-up' element={<SignUp/>}></Route>
          <Route exact path='/docs' element={<Docs/>}></Route>
          <Route exact path='/' element={<Notes/>}></Route>
          <Route exact path='/about' element={<About/>}></Route>
        </Routes>
      </BrowserRouter>
    </NotesState>
  );
}

export default App;
