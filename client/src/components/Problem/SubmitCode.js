import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CircularProgress,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { submitCodeForVerdict } from "../../api/api";
import CodeEditor from "./CodeEditor";
import Alert from "@material-ui/lab/Alert";

const getVerdictFromCode = (code, i) => {
  switch (code) {
    case 2:
      return (
        <Alert severity="warning" variant="standard">
          <b>Test Case {i}:</b> Time Limit Exceeded
        </Alert>
      );
    case 3:
      return (
        <Alert severity="warning" variant="standard">
          <b>Test Case {i}:</b> Memory Limit Exceeded
        </Alert>
      );
    case 4:
      return (
        <Alert severity="success" variant="standard">
          <b>Test Case {i}:</b> Passed
        </Alert>
      );
    case 5:
      return (
        <Alert severity="error" variant="standard">
          <b>Test Case {i}:</b> Wrong Answer
        </Alert>
      );
    case 6:
      return (
        <Alert severity="error" variant="standard">
          <b>Test Case {i}:</b> Run Time Error
        </Alert>
      );
    case 7:
      return (
        <Alert severity="error" variant="standard">
          <b>Test Case {i}:</b> Run Time Error
        </Alert>
      );
    case 8:
      return (
        <Alert severity="error" variant="filled">
          Server Unreachable
        </Alert>
      );
  }
};

const LanguageField = ({state}) => {
  const classes = useStyles();
  const [language, setLanguage] = useState(1);
  const languages = [
    {
      value: 0,
      label: "C",
    },
    {
      value: 1,
      label: "CPP",
    },
  ];
  return (
    <div className={classes.submitContainer}>
      <TextField
        id="select-language"
        select
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        helperText="code language"
        // fullWidth="true"
        name="language"
        required
        disabled={state==0}
      >
        {languages.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        color="secondary"
        // fullWidth="true"
        variant="contained"
        className={classes.submitButton}
        disabled={state==0}
      >
        Submit code
      </Button>
    </div>
  );
};

const Verdicts = ({ state, verdicts }) => {
  return (
    <div>
      {state == 1 ? (
        <Paper>
          {verdicts.length == 2 ? (
            verdicts[0] == 0 ? (
              <div>
                <Card elevation={6}>
                  {verdicts[1].map((verdict, i) =>
                    getVerdictFromCode(verdict, i + 1)
                  )}
                </Card>
              </div>
            ) : (
              <div>
                <Card>
                  <Alert severity="warning" variant="filled">
                    Compilation Error
                  </Alert>
                  <CardContent>
                    <code>{verdicts[1]}</code>
                  </CardContent>
                </Card>
              </div>
            )
          ) : (
            <span />
          )}
        </Paper>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress color="secondary" />
        </div>
      )}
    </div>
  );
};

/**Main Component */

const SubmitCode = ({ problem }) => {
  const classes = useStyles();
  const [verdicts, setVerdicts] = useState([0]);
  const [status, setStatus] = useState(1);
  //Code and language variables
  let code,
    language = 1;
  const setCode = (val) => {
    code = val;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(0);
    let form = new FormData(e.target);
    const language = form.get("language");

    try {
      const { data } = await submitCodeForVerdict(problem._id, {
        code: code,
        language: language,
      });
      console.log(data.verdicts);
      setStatus(1);
      setVerdicts(data.verdicts);
    } catch (e) {
      setStatus(1);
      setVerdicts([0,[8]]);
      console.log(e, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container className={classes.body}>
        <Grid container spacing={3}>
          <Grid item md={9} sm={12}>
            <CodeEditor problem={problem} handler={setCode} />
          </Grid>
          <Grid item md={3} sm={12}>
            <LanguageField state={status}/>
            <br />
            <br />
            <Verdicts state={status} verdicts={verdicts} />
          </Grid>
        </Grid>
      </Container>
    </form>
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
  submitButton: {},
  submitContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
}));

export default SubmitCode;
