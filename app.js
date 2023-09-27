import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// Sample user data for local storage
const initialUsers = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to handle user login
  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
    } else {
      alert('Invalid username or password');
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          {currentUser ? <Redirect to="/todo" /> : <LoginForm onLogin={handleLogin} />}
        </Route>
        <Route path="/todo">
          {currentUser ? (
            <TodoList currentUser={currentUser} onLogout={handleLogout} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App