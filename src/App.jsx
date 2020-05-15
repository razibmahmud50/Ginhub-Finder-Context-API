import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState'


const App = () => {
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



  //set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <GithubState>
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
                  setAlert={showAlert}
                />
                <Users/>
              </Fragment>
            )} />
            <Route exact path="/about" component={About} />
            <Route exact path="/user/:login" component={User}/>
          </Switch>
        </div>
      </div>
    </Router>
    </GithubState>
  );

}

export default App;
