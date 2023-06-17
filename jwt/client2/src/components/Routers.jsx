import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { UserList } from "./UserList";

function AppRouters(props) {
  return (
    <BrowserRouter>
      <div className="row">
        <Link className="btn btn-dark col m-3" to="/login">
          Login
        </Link>
        <Link className="btn btn-dark col m-3" to="/users">
          Show Users
        </Link>
      </div>

      <hr />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>

        <Route path={["/users", ""]}>
          <UserList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { AppRouters };
