import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import { signOut } from "../api/api";

const NavBar = ({ authData, setAuthData }) => {
  const [openSignin, setOpenSignin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const classes = useStyles();

  const handleOpenSignin = () => {
    setOpenSignin(true);
  };

  const handleCloseSignin = () => {
    setOpenSignin(false);
  };

  const handleOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAuthData(false);
    } catch (error) {
      console.log("Server is inactive !");
    }
  };

  const AuthButtons = () => {
    if (!authData) {
      return (
        <span>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenSignin}
            className={classes.button}
          >
            SIGN IN
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenSignup}
          >
            SIGN UP
          </Button>
        </span>
      );
    } else if (!authData.admin) {
      return (
        <span>
          <Button
            color="inherit"
            className={classes.button}
            startIcon={<PersonIcon />}
            component={Link}
            to={"/profile/" + authData._id}
          >
            {authData.handle}
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            LogOut
          </Button>
        </span>
      );
    } else {
      return (
        <span>
          <Button
            color="inherit"
            className={classes.button}
            startIcon={<PersonIcon />}
            component={Link}
            to={"/profile/" + authData._id}
          >
            {authData.handle}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            component={Link}
            to="/problems/create"
          >
            Create New Problem
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSignOut}>
            LogOut
          </Button>
        </span>
      );
    }
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Container className={classes.container}>
            {/* <Typography variant="h5" className={classes.button}>
              Logo
            </Typography> */}
            <img
              alt="logo"
              width="70px"
              object-fit="contain"
              src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo-768x432.png"
            />
            <div className={classes.maxoccupy}>
              <Button
                color="inherit"
                className={classes.button}
                component={Link}
                to="/"
              >
                <Typography variant="button">HOME</Typography>
              </Button>
              <Button
                color="inherit"
                className={classes.button}
                component={Link}
                to="/problems"
              >
                <Typography variant="button">PROBLEMS</Typography>
              </Button>
              <Button color="inherit" className={classes.button}>
                <Typography variant="button">LEADERBOARD</Typography>
              </Button>
            </div>
            {AuthButtons()}
          </Container>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      {authData ? (
        <span></span>
      ) : (
        <Container>
          <Dialog
            open={openSignin}
            onClose={handleCloseSignin}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <Signin
                openSignup={handleOpenSignup}
                closeSignin={handleCloseSignin}
                setAuthData={setAuthData}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openSignup}
            onClose={handleCloseSignup}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <Signup
                openSignin={handleOpenSignin}
                closeSignup={handleCloseSignup}
                setAuthData={setAuthData}
              />
            </DialogContent>
          </Dialog>
        </Container>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  maxoccupy: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
  },
}));

export default NavBar;
