import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import BoardModerator from "./components/BoardModerator";
import BoardUser from "./components/BoardUser";
import Teams from "./components/Teams";
import HelpButton from "./components/HelpButton";
import VotePlayer from "./components/VotePlayer";
import Players from "./components/Players";

export default [
  { path: "/", name: "Home", Component: <Home /> },
  { path: "/home", name: "Home", Component: <Home />, children: []},
  { path: "/login", name: "Login", Component: <Login /> },
  { path: "/register", name: "Register", Component: <Register /> },
  { path: "/profile", name: "Profile", Component: <Profile /> },
  { path: "/user", name: "User Board", Component: <BoardUser /> },
  { path: "/mod", name: "Moderator Board", Component: <BoardModerator /> },
  { path: "/admin", name: "Admin Board", Component: <BoardAdmin /> },
  { path: "/teams", name: "Teams", Component: <><HelpButton /><Teams /></> },
  { path: "/players", name: "Players", Component: <Players /> },
  { path: "/vote-player", name: "Vote", Component: <VotePlayer /> },
];