import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { AuthRoute } from "./UnauthenticatedApp";
import { PrivateRoute } from "./AuthanticatedApp";
import Login from "../module/auth/containers/Login";
import Dashboard from "../module/dashboard/container";
import Home from "../module/Home/containers/Home";
import QuizeDetails from "../module/quize/containers/Quize";
import CreateQuize from "../module/dashboard/components/CreateQuize";
import DashboardQuizeDetails from "../module/dashboard/components/QuizeDetails";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <AuthRoute path='/auth/login' component={() => <Login />} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/dashboard/new-quize'
          component={CreateQuize}
        />
        <Route exact path='/quizes/:id' component={QuizeDetails} />
        <PrivateRoute
          exact
          path='/dashboard/:id'
          component={DashboardQuizeDetails}
        />
      </Switch>
    );
  }
}
function mapStateToProps(store: any) {
  return {
    user: store.auth.token,
  };
}
export default connect(mapStateToProps)(App);
