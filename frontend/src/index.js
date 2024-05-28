import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HorizontalNonLinearStepper from './components/stepper'
import LoginForm from './login/login'
import Game from './gamepage/game';
import Bet from './bettingpage/bet';

export default function app() {

  return (
    <div>
      <Routes>
      <Route   path="/" element={<App></App>}/>
      <Route  path="post"  element={<HorizontalNonLinearStepper></HorizontalNonLinearStepper>} />
      <Route  path="login"  element={<LoginForm></LoginForm>} />
      <Route  path="game"  element={<Game></Game>} />
      <Route  path="bet"  element={<Bet></Bet>} />


      </Routes>
      </div>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
     {app()}
    </BrowserRouter> 
     </React.StrictMode>
);
