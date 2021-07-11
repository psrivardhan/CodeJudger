import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getProblemSubmissions, getSubmission } from "../../api/api";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const Submissions = ({ problem }) => {
  const classes = useStyles();
  const [submissions, setSubmissions] = useState([]);
  const [submission, setSubmission] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchProblemSubmissions() {
      try {
        const { data } = await getProblemSubmissions(problem._id);
        if (!data.message) setSubmissions(data.submissions);
      } catch (error) {
        console.log("Server is inactive !");
        console.log(error);
      }
    }
    fetchProblemSubmissions();
  }, [problem._id]);

  // //To change later
  // useEffect(()=>{
  //   const script1 = document.createElement('script');
  //   script1.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/components/prism-core.min.js";
  //   const script2 = document.createElement('script');
  //   script1.src = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/plugins/autoloader/prism-autoloader.min.js";
  //   document.body.append(script1);
  //   document.body.append(script2);
  //   const link1 = document.createElement('link');
  //   link1.rel="stylesheet"
  //   link1.href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.0/themes/prism.css";
  //   document.head.append(link1);

  //   return ()=>{

  //   }
  // },[])

  const handleClose = () => setOpen(false);

  const handleSubmission = async (id) => {
    try {
      const { data } = await getSubmission(id);
      if (!data.message) setSubmission(data);
      setOpen(true);
    } catch (error) {
      console.log("Server is inactive !");
      console.log(error);
    }
  };

  return (
    <Container className={classes.body}>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>WHO</TableCell>
                  <TableCell>WHEN</TableCell>
                  <TableCell>LANGUAGE</TableCell>
                  <TableCell>CODE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.submissionId}>
                    <TableCell>{submission.userHandle}</TableCell>
                    <TableCell>{submission.date}</TableCell>
                    <TableCell>{findLanguage(submission.language)}</TableCell>
                    <TableCell>
                      <Link
                        component="button"
                        onClick={() =>
                          handleSubmission(submission.submissionId)
                        }
                      >
                        View Code
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={3}>
          <Paper square>
            <Typography
              component="div"
              style={{ backgroundColor: "#cfe8fc", height: "50vh" }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <AceEditor
          mode="c_cpp"
          theme="monokai"
          value={submission.code}
          editorProps={{
            $blockScrolling: true,
          }}
          placeholder="// Write your code here"
          width="100%"
          maxLines={30}
          minLines={30}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 4,
          }}
          showPrintMargin={false}
          fontSize={18}
          readOnly
        />
      </Dialog>
    </Container>
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
  submission: {
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

export default Submissions;
