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
import { signIn } from "../api/api";

const Signin = ({ closeSignin, openSignup, setAuthData }) => {
  const [errorInfo, setErrorInfo] = useState("");

  const classes = useStyles();
  const gotoSignup = () => {
    closeSignin();
    openSignup();
  };

  const handleSigninForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const handle = formData.get("handle");
    const password = formData.get("password");

    //Making an api call

    try {
      const { data } = await signIn({ handle, password });

      if (data.message) setErrorInfo(data.message);
      else {
        setAuthData(data);
        closeSignin();
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
        Sign in
      </Typography>
      {errorInfo !== "" ? (
        <Alert severity="error">{errorInfo}</Alert>
      ) : (
        <span></span>
      )}
      <form className={classes.form} onSubmit={handleSigninForm}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="User Handle"
          name="handle"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component="button" variant="body2" onClick={gotoSignup}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default Signin;
