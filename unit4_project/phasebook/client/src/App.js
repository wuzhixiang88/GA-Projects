import "./App.css";
import { Route, Switch } from "react-router";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import UserMainPage from "./pages/UserMainPage";
import UserFriendPage from "./pages/UserFriendPage";
import PostShowPage from "./pages/PostShowPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/user/:id">
          <UserMainPage />
        </Route>
        <Route exact path="/user/:id/friends">
          <UserFriendPage />
        </Route>
        <Route exact path="/photo/:id">
          <PostShowPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
