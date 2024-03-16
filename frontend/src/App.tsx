import React, {FunctionComponent} from 'react';
import './App.css';
import {Layout} from "./components/layout/Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Dashboard } from './pages/Dashboard/Dashboard';
import './static/fonts/MuseoSansCyrl-300.ttf'
import './static/fonts/MuseoSansCyrl-500.ttf'
import './static/fonts/MuseoSansCyrl-700.ttf'

export const App: FunctionComponent = () => {
    console.log(process.env.REACT_APP_BACKEND_URL)
  return (

      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path='user' element={<>user</>} />
            </Route>
            <Route path='/error/' element={<Layout />} >
                <Route index element={<>У вас нет роли администратора</>} />
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
