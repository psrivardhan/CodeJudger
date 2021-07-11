import React from "react";
import {Backdrop} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const LoadingScreen = ()=>{
    const classes = useStyles();
    return (
        <Backdrop className={classes.backdrop} open={true}>
            {/* <CircularProgress color="inherit" /> */}
            <Alert severity="info">Loading...</Alert>
        </Backdrop>
    );
}

const useStyles = makeStyles((theme) => ({
    
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));



export default LoadingScreen;