import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { userInLoggedIn } from "../utils/authentication";

export class AuthRoute extends React.Component<any> {
  render() {
    return userInLoggedIn() ? (
      <Redirect to={{ pathname: "/dashboard" }} />
    ) : (
      <Switch>
        <Route
          path={this.props.path}
          render={(props) => this.props.component(props)}
        />
        <Route render={() => <div>page not found</div>} />
      </Switch>
    );
  }
}
