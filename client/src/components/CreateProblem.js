import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  TextField,
  Tabs,
  Tab,
  Typography,
  Paper,
  Grid,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { createProblem, getProblems } from "../api/api";
import LoadingScreen from "./LoadingScreen";
import marked from "marked";

const CreateProblem = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [ids, setids] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAdd = () => {
    setids([...ids, ids.length + 1]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    let testcasesInput = [];
    let testcasesOutput = [];
    const timeLimit = formData.get("timelimit");
    const memoryLimit = formData.get("memorylimit");
    const score = formData.get("score");

    ids.map((id) => {
      testcasesInput.push(formData.get("input" + id));
      testcasesOutput.push(formData.get("output" + id));
    });

    const { data } = await createProblem({
      title,
      description,
      testcasesInput,
      testcasesOutput,
      timeLimit,
      memoryLimit,
      score,
    });

    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          inputProps={{
            style: {
              fontWeight: "bold",
              fontSize: 38,
              lineHeight: 1.2,
            },
          }}
          placeholder="Title"
          name="title"
          className={classes.title}
          multiline
          rowsMax={4}
          fullWidth
          required
        />
        <div className={classes.bodyheader}>
          <Tabs
            indicatorColor="secondary"
            textColor="primary"
            value={value}
            onChange={handleChange}
          >
            <Tab label="Edit body" />
            <Tab label="Preview" />
          </Tabs>
        </div>
        {value == 0 ? (
          <TextField
            placeholder="Description"
            name="description"
            required
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={30}
            fullWidth
            variant="outlined"
            className={classes.title}
          />
        ) : (
          <div
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: marked(description),
            }}
          />
        )}
        <TextField
          placeholder="Time Limit"
          name="timelimit"
          required
          type="number"
          step={0.01}
          variant="outlined"
          className={classes.title}
        />
        <TextField
          placeholder="Memory Limit"
          name="memorylimit"
          required
          type="number"
          variant="outlined"
          className={classes.title}
        />
        <TextField
          placeholder="Score"
          name="score"
          required
          type="number"
          variant="outlined"
          className={classes.title}
        />

        {ids.map((id) => (
          <TestCase key={id} id={id} />
        ))}
        <br />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdd}
          className={classes.title}
        >
          Add Test Case
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          className={classes.title}
        >
          Create Problem
        </Button>
      </form>
    </Container>
  );
};

const TestCase = ({ id }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="subtitle2">Test Case {id}</Typography>
      <TextField
        multiline
        rows={8}
        name={"input" + id}
        placeholder="Input"
        variant="outlined"
        className={classes.title}
      />
      <TextField
        multiline
        rows={8}
        name={"output" + id}
        placeholder="Output"
        variant="outlined"
        className={classes.title}
      />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2),
  },
  bodyheader: {
    display: "flex",
    marginLeft: theme.spacing(3),
  },
}));

export default CreateProblem;
