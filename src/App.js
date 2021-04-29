import Profile from './components/Profile'
import Register from './layouts/Register'
import Login from './layouts/Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './layouts/Home';

// routes for application placed in this file 


function App() {

  return (
    <Router>
      <div className="App">

        <Switch>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/" component={Home}>

          </Route>


          <Route exact path="/participant_profile" component={Profile}>

          </Route>

        </Switch>

      </div>
    </Router>
  );
}

export default App;
