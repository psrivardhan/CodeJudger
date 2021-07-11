import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  Container,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { getProblemInfo } from "../api/api";
import Description from "./Problem/Description";
import Submissions from "./Problem/Submissions";
import SubmitCode from "./Problem/SubmitCode";
import LoadingScreen from "./LoadingScreen";

const ProblemInfo = () => {
  const classes = useStyles();
  const [problem, setProblem] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchProblemInfo(id) {
      try {
        const { data } = await getProblemInfo(id);
        if (!data.message) setProblem(data);
      } catch (error) {
        console.log("Server is inactive !");
      }
    }
    console.log("Fetching Problem");
    fetchProblemInfo(id);
  }, []);

  const [tabState, setTabState] = useState(0);

  const handleChange = (event, newValue) => {
    setTabState(newValue);
  };

  return (
    <div>
      {problem === "" ? (
        <LoadingScreen />
      ) : (
        <div>
          <Container className={classes.header}>
            <Typography variant="h5">{problem.title}</Typography>
            <Grid item md={9} xs={12} className={classes.body}>
              <Tabs
                value={tabState}
                indicatorColor="secondary"
                textColor="secondary"
                onChange={handleChange}
                centered
              >
                <Tab label="Description" />
                <Tab label="Submit Code" />
                <Tab label="Submissions" />
              </Tabs>
            </Grid>
          </Container>
          {tabState == 0 ? (
            <Description problem={problem} />
          ) : tabState == 1 ? (
            <SubmitCode problem={problem} />
          ) : (
            <Submissions problem={problem} />
          )}
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(0),
  },
  problem: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "row",
  },
  section1: {
    flex: 5,
  },
  section2: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  problemTitle: {
    textDecoration: "none",
    color: "black",
    "&:visited": {
      color: "black",
    },
    "&:hover": {
      color: "green",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default ProblemInfo;
