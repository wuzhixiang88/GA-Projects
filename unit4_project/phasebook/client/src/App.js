import "./App.css";
import { Route, Switch } from "react-router";
import LandingPage from "./pages/LandingPage";
import UserMainPage from "./pages/UserMainPage";
import PostShowPage from "./pages/PostShowPage";

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
        <Route exact path="/photo/:id">
          <PostShowPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
