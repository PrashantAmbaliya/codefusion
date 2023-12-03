
import './App.css';
import Home from "./pages/home";
import Editorpage from "./pages/editorPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
      <Toaster position='top-right'>
      </Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/editor/:roomID" element={<Editorpage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
