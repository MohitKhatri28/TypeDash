import '../css/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom"
import { useEffect } from 'react';
import LogIn from './auth/login';
import SignUp from './auth/signup';
import PasswordReset from './auth/passwordreset';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/"element={<p>Home</p>}  >
          Home
        </Route>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/password-reset" element={<PasswordReset/>} />
      </Routes>
    </Router>
  );
}

export default App;
