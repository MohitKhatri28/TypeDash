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
function App() {

  useEffect(() => {
    fetch('/api/login')
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/">
          Home
        </Route>
        <Route path="/login" element={<LogIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
