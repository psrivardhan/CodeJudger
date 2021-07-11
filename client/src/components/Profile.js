import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { getUserProfile } from "../api/api";
import LoadingScreen from "./LoadingScreen";
import moment from "moment";

const Profile = () => {
  const classes = useStyles();
  const [profile, setProfile] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getUserProfile(id);
        if (!data.message) setProfile(data);
        console.log(data);
      } catch (error) {
        console.log("Server is inactive !");
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      {!profile ? (
        <LoadingScreen />
      ) : (
        <div>
          <Container className={classes.body}>
            <Grid container spacing={3}>
              <Grid item md={3} xs={12}>
                <Avatar variant="rounded" className={classes.avatar}>
                  {profile.firstName.charAt(0)}
                  {profile.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h5" className={classes.name}>
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="caption" className={classes.handle}>
                  @{profile.handle}
                </Typography>
                <Typography variant="h6">Score : {profile.score}</Typography>
                <Typography variant="h6">
                  Problems Solved : {profile.problemsSolved}
                </Typography>
                <Typography variant="h6">
                  Registered {moment(profile.createdAt).fromNow()}
                </Typography>
              </Grid>
              <Grid item md={9} xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>WHEN</TableCell>
                        <TableCell>PROBLEM</TableCell>
                        <TableCell>LANGUAGE</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>SUBMISSION</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {profile.submissions.map((submission) => (
                        <TableRow key={submission.submissionId}>
                          <TableCell>{submission.date}</TableCell>
                          <TableCell>{submission.problemTitle}</TableCell>
                          <TableCell>
                            {findLanguage(submission.language)}
                          </TableCell>
                          <TableCell>
                            {submission.status ? "Accepted" : "Wrong Answer"}
                          </TableCell>
                          <TableCell>
                            <Link component="button">View Code</Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

const findLanguage = (num) => {
  if (num === 0) return "C";
  else return "C++";
};

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  body: {
    marginTop: theme.spacing(5),
  },
  avatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    backgroundColor: "black",
    fontWeight: "bold",
    fontSize: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: theme.spacing(2),
  },
  handle: {
    color: "gray",
    fontSize: 15,
  },
}));

export default Profile;
