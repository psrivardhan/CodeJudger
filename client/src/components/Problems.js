import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { getProblems } from "../api/api";
import LoadingScreen from "./LoadingScreen";

const Problems = () => {
  const classes = useStyles();
  const [problems, setProblems] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setnumberOfPages] = useState(0);
  const [minScore, setMinScore] = useState(0);
  const [maxScore, setMaxScore] = useState(100000);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const { data } = await getProblems({ page, minScore, maxScore });
        if (!data.message) {
          setProblems(data.problems);
          setnumberOfPages(data.numberOfPages);
        }
      } catch (error) {
        console.log("Server is inactive !");
      }
    }
    console.log("Fetching Problem");
    fetchProblems();
  }, [page, minScore, maxScore]);

  const handleFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setMinScore(formData.get("minscore"));
    setMaxScore(formData.get("maxscore"));
  };

  return (
    <div>
      {problems.length == 0 ? (
        <LoadingScreen />
      ) : (
        <div>
          <Paper className={classes.header} variant="outlined" square>
            <Container>
              <Typography variant="h4">Problems</Typography>
            </Container>
          </Paper>

          <Container className={classes.body}>
            <Grid container spacing={3}>
              <Grid item md={9} xs={12}>
                {problems.map((problem) => (
                  <Problem key={problem._id} problem={problem} />
                ))}
                <Pagination
                  style={{display:"flex",justifyContent:"center",marginTop:"30px"}}
                  color="secondary"
                  count={numberOfPages}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  
                />
              </Grid>
              <Grid item md={3}>
                <Paper square>
                  <Typography variant="h6">Filter Problems</Typography>
                  <Typography variant="subtitle2">Score</Typography>
                  <form onSubmit={handleFilter}>
                    <TextField
                      placeholder="Minimum"
                      type="number"
                      name="minscore"
                    />
                    <TextField
                      placeholder="Maximum"
                      type="number"
                      name="maxscore"
                    />
                    <Button type="submit">Apply</Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

const Problem = ({ problem }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" square className={classes.problem}>
      <div className={classes.section1}>
        <Typography
          variant="h5"
          className={classes.problemTitle}
          component={Link}
          to={`/problems/${problem._id}`}
        >
          {problem.title}
        </Typography>
        <br />

        {problem.tags?.map((tag) => (
          <Typography style={{fontSize:"12.5px"}} key={tag} variant="caption">
            {tag},{" "}
          </Typography>
        ))}
      </div>
      <div className={classes.section2}>
        <Typography variant="h5">
          {"Score : "}
          {problem.score}
        </Typography>
      </div>
      <div className={classes.section2}>
        <Typography variant="h5">x{problem.submissionsCount}</Typography>
      </div>
    </Paper>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(5),
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
}));

export default Problems;
