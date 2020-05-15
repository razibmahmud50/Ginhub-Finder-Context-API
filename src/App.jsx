import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';


const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  //show users
  useEffect(() => {
    //show github user in home page(default)
    // setLoading(true)

    // const res = axios.get(`https://api.github.com/users?
    //   client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
    //   client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)

    // setUsers(res.data)
    // setLoading(false)
  }, [])

  // search github users
  const searchUsers = async (text) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
    setUsers(res.data.items)
    setLoading(false)
  }
  //get single user
  const getUser = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}?
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
    setUser(res.data)
    setLoading(false)
  }
  //get user repos
  const getUserRepos = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
    setRepos(res.data)
    setLoading(false)
  }
  //clear all users
  const clearUsers = () => {
    setUsers([])
  }
  //set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert
            alert={alert} />
          <Switch>
            <Route exact path="/" render={props => (
              <Fragment>
                <Search
                  searchUsers={searchUsers}
                  clearUsers={clearUsers}
                  showClearBtn={users.length > 0 ? true : false}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" render={props => (
              <User {...props} getUserRepos={getUserRepos} repos={repos} getUser={getUser} user={user} loading={loading} />
            )} />
          </Switch>

        </div>
      </div>
    </Router>
  );

}

export default App;
