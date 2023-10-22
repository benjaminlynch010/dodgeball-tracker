// Routing components
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ProtectedRoute from "../_unused_components/utility/ProtectedRoute";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Component imports
import TournamentList from "../Main/Tournaments/TournamentList";
import LoginPage from '../Login-Register/Login/LoginPage';
import RegisterPage from "../Login-Register/Register/RegisterPage";
import GamesList from "../Main/Games/GamesList";
import Header from "../Header-Footer/Header/Header";
import Footer from '../Header-Footer/Footer/Footer'
import GameDetail from '../Main/Games/GameDetail';

// Admin component imports
import CreateTournament from '../Admin/CreateTournament'
import ManageTournaments from "../Admin/ManageTournaments";
import AddTeam from '../Admin/AddTeam'
import ManageTeams from '../Admin/ManageTeams'
import ManageUsers from "../Admin/ManageUsers";
import ManagePlayers from '../_unused_components/admin/ManagePlayers'

// Nav, header, etc. component imports
import BottomNavbar from "../BottomNavbar/BottomNavbar";
import Leaderboard from "../Leaderboard/Leaderboard";
import './App.css';

// Unique identifiers for anonymous users
import { v4 as uuidv4 } from 'uuid';
import { uniqueNamesGenerator, colors, animals } from "unique-names-generator";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // Creating unique user ID
  //! this has been basically detached from anything dynamic
  //! will likely need to be redone in a way that minds the 
  //! PWA functionality
  const uniqueID = {
    // Generating UUID from DNS namespace
    uuid: uuidv4('usa_dodgeball', uuidv4.DNS),

    // Generating pseudonym for easier readability
    pseudonym: uniqueNamesGenerator({
      dictionaries: [colors, animals],
      length: 2,
      seed: uuidv4('usa_dodgeball', uuidv4.DNS)
    })
  }

  // Fetch user
  useEffect(() => {
    dispatch({ type: "FETCH_USER", payload: uniqueID });
  }, [dispatch]);

  // Fetching global state from database at app load
  useEffect(() => {
    dispatch({ type: 'FETCH_PLAYERS', payload: user });
    dispatch({ type: "FETCH_TEAMS" });
    dispatch({ type: "FETCH_TOURNAMENTS" });
    dispatch({ type: 'FETCH_GAMES' });
    dispatch({ type: "FETCH_STATS" });
  }, [])

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* ADMIN COMPONENTS */}
          <Route exact path="/admin/create-tournament">
            <CreateTournament />
          </Route>

          <Route exact path="/admin/manage-tournaments">
            <ManageTournaments />
          </Route>

          <Route exact path="/admin/add-team">
            <AddTeam />
          </Route>

          <Route exact path="/admin/manage-teams">
            <ManageTeams />
          </Route>

          <Route exact path="/admin/manage-users">
            <ManageUsers />
          </Route>

          <Route exact path="/admin/manage-players">
            <ManagePlayers />
          </Route>

          {/* MAIN USER COMPONENTS */}
          <Route
            // logged in shows UserPage else shows LoginPage
            exact
            path="/home"
          >
            <TournamentList />
          </Route>

          <Route
            // logged in shows InfoPage else shows LoginPage
            path="/gameview/:id"
          >
            <GameDetail />
          </Route>

          <Route path="/games/:id">
            <GamesList />
          </Route>

          <Route path="/leaderboard/:id">
            <Leaderboard />
          </Route>

          {/* LOGIN / REGISTRATION */}
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,

              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>          

          {/* 404 */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <BottomNavbar />
        <Footer />
      </div>
    </Router>
  );
}