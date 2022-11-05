import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Requests from './components/Requests';
import Users from './components/Users';
import Resources from './components/Resources';
import CreateItem from './components/CreateItem';
import ResourceDetails from './components/ResourceDetails';
import LoginPage from './components/LoginPage';
import { useState } from 'react';
import { LoginContext } from './context/LoginContext';


function App() {

  const [login, setLogin] = useState("false");

  return (<>
    <LoginContext.Provider value={{ login, setLogin }} >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/users" element={<Users />} />
          <Route path="/resource/:id" element={<ResourceDetails />} />
          <Route path="/resource/create" element={<CreateItem />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  </>);
}

export default App;