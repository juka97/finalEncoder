import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Col, Button, Form, FormGroup, Label, Input, FormText,Navbar} from 'reactstrap';
import Login from "./components/login/loginForm"
import Algorithm from "./components/algorithm/algorithm"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';
import { TOKEN, getToken } from "./components/constants/constants";




export default function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact component={Login}/>
          <LoggedInRoute path="/home" exact component={Algorithm}/>
        </Switch>
      </div>
    </Router>
  );
}

const LoggedInRoute = ({component: Component, ...rest}) => (
  <Route
      {...rest}
      render={props => (
          (getToken() !== null)
              ? (
                  <Component {...props} />
              )
              : 
              (<Redirect to = "/"/>)
      )}
  />
);



