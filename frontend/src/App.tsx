import React, {FunctionComponent} from 'react';
import './App.css';
import { Layout } from "./components/layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard/Dashboard';
import './static/fonts/MuseoSansCyrl-300.ttf'
import './static/fonts/MuseoSansCyrl-500.ttf'
import './static/fonts/MuseoSansCyrl-700.ttf'
import { LoginPage } from './pages/Login/Login';
import { CookiesProvider, useCookies } from 'react-cookie';
import { AuthLayout } from './components/layout/AuthLayout';
import { RegisterPage } from './pages/Register/Register';
import { SingleTask } from './pages/SingleTask/SingleTask';
import { Profile } from './pages/profile/Profile';

export const App: FunctionComponent = () => {
  const [access] = useCookies(['access_token'])

  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <Routes>

          {
            access.access_token === undefined ? (
              <>
                <Route path="auth/*" element={<AuthLayout />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/auth/login" replace={true} />} />
              </>
            ) : (
              <>
                <Route path="/*" element={<Layout />} >
                  <Route index element={<Dashboard />} />
                  <Route path="all-tasks" element={<>all-tasks</>} />
                  <Route path="task/:id" element={<SingleTask />} />
                  <Route path="account" element={<Profile />} />
                </Route>
                <Route path="auth/*" element={<Navigate to="/" replace={true} />} />
              </>
            )
          }

        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
