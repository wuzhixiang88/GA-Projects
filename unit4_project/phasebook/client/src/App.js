// import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router";
import LandingPage from "./pages/LandingPage";
import UserMainPage from "./pages/UserMainPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/:id">
          <UserMainPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
