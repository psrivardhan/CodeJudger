import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardHeader,
  Avatar,
  Chip,
  Divider,
  CardContent,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { green, pink } from "@material-ui/core/colors";
import MemoryIcon from "@material-ui/icons/Memory";
import SpeedIcon from "@material-ui/icons/Speed";
import marked from "marked";
import { Rating } from "@material-ui/lab";

const Description = ({ problem }) => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.body}>
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            {problem === "" ? (
              <span />
            ) : (
              <Paper style={{padding:"20px 15px "}} elevation={5} >
              <div style={{fontFamily: `'Poppins', sans-serif`,fontSize:"17px"}}
                className={classes.title}
                dangerouslySetInnerHTML={{
                  __html: marked(problem.description),
                }}
              />
              </Paper>
            )}
          </Grid>
          <Grid item md={3}>
            <Paper>
              <Card className={classes.root} elevation={5}>
                <CardContent>
                  <Typography variant="h6">Constraints</Typography>
                  <br />
                  <CardHeader
                    className={classes.constraints}
                    avatar={
                      <Avatar className={classes.green}>
                        <SpeedIcon />
                      </Avatar>
                    }
                    title={
                      <Typography variant="body1">{`Time Limit: ${problem.timeLimit}s`}</Typography>
                    }
                    subheader="For each Test case"
                  />
                  <br></br>
                  <CardHeader
                    className={classes.constraints}
                    avatar={
                      <Avatar className={classes.pink}>
                        <MemoryIcon />
                      </Avatar>
                    }
                    title={
                      <Typography variant="body1">{`Memory Limit: ${problem.memoryLimit}MB`}</Typography>
                    }
                    subheader="For all Tests"
                  />
                </CardContent>

                <Divider />

                <CardContent>
                  <Typography variant="h6">Tags</Typography>
                  <div className={classes.tagContainer}>
                    {problem.tags?.map((tag) => (
                      <Chip
                        className={classes.tagChip}
                        label={tag}
                        size="small"
                        variant="outlined"
                        color="secondary"
                      />
                    ))}
                  </div>
                </CardContent>

                <Divider />
                <br/>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography variant="body1">Score</Typography>
                    <Typography variant="button">{problem.score}</Typography>
                </Box>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography variant="body1">Difficulty</Typography>
                    <Rating
                      defaultValue={2}
                      readOnly
                    />
                </Box>
                

                </div>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(2),
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
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  tagContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "space-around",
  },
  tagChip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(0.5),
  },
  constraints: {
    padding: 0,
  },
}));

export default Description;
