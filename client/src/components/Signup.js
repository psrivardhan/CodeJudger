import React, { useState } from "react";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import { signUp } from "../api/api";

const Signup = ({ closeSignup, openSignin, setAuthData }) => {
  const [errorInfo, setErrorInfo] = useState("");

  const classes = useStyles();

  const gotoSignin = () => {
    closeSignup();
    openSignin();
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const handle = formData.get("handle");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    //Making api call

    try {
      const { data } = await signUp({
        firstName,
        lastName,
        handle,
        email,
        password,
        confirmPassword,
      });

      if (data.message) setErrorInfo(data.message);
      else {
        setAuthData(data);
        closeSignup();
      }
    } catch (error) {
      setErrorInfo("Server is not active !");
    }
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      {errorInfo !== "" ? (
        <Alert severity="error">{errorInfo}</Alert>
      ) : (
        <span></span>
      )}
      <form className={classes.form} onSubmit={handleSignupForm}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              variant="outlined"
              required
              fullWidth
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="User Handle"
              name="handle"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link component="button" variant="body2" onClick={gotoSignin}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Signup;
