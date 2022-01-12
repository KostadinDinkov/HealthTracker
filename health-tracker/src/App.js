import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar';
import Homepage from './components/Homepage/Homepage';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import UserPage from './components/UserPage/UserPage';
function App() {
  return (
    
      <div className="App">
        <BrowserRouter>
        <header className="App-header">
            <TopBar/>
        </header>
      
      <div className='body'>
        
          <Routes>
          <Route exact path="/" element={<Navigate replace to='/home'/>}/>
          <Route exact path='/home' element={<Homepage/>} />
          <Route exact path='/registration' element={<RegistrationForm/>} />
          <Route exact path='/login' element={<LoginForm/>} />
          <Route exact path='/users/:id' element={<UserPage/>} />
          </Routes>
     
      </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
