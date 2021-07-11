/**
 * Creates a file and compiles and judges the reseult
 */

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(require("fs").writeFile);

/**
 * @returns an array of two elements status code and message
 * Code 0: Compilation success and  message contains verdicts array
 * Code 1: Compilation Failed and message contains error description
 */

compileANDjudge = async (
  fileName,
  language,
  sourceCode,
  timeLimit,
  memLimit,
  testCases,
  answers,
  runScript = "default_test_script.sh"
) => {

  //Generating file
  fileName += language == 0 ? ".c" : ".cpp";
  try {
      await writeFile("./Judge/tmp/" + fileName, sourceCode);
  } catch (error) {
      console.log(`File ${fileName} creation failed`);
      return [-1,-1];
  }
  

  
  const compileCmd = `./Judge/scripts/compile_script.sh ${fileName}`;
  try {
    //Wait for the command to execute
    await exec(compileCmd);
    //Proceed to judge the test cases
    verdicts = new Array(testCases.length);
    for (let i = 0; i < testCases.length; i++) {
      const runCmd = `./Judge/scripts/runner_script.sh ${fileName} ${timeLimit} ${memLimit} "${testCases[i]}" "${answers[i]}" ${runScript}`;
      try {
        //Wait for the test case to run
        await exec(runCmd);
      } catch (error) {
        verdicts[i] = error.code;
      }
    }
    //Removing all the genarated files
    await exec(`rm ./Judge/tmp/${fileName}*`);
    return [0, verdicts];
  } catch (error) {
    //console.log(error);
    //Removing all the genarated files
    await exec(`rm ./Judge/tmp/${fileName}*`);
    return [
      1,
      error.stderr.replace(new RegExp(`./Judge/tmp/${fileName}:`, "g"), "Line: "),
    ];
  }
};

//scode = `#include <iostream>\n using namespace std;\n int main(){ int t,a; cin>>t; while(t--) { cin>>a; cout<<a<<" "; } return 0; }`;

// (async () => {
//   console.log(
//     await compileANDjudge(
//       "test",
//       1,
//       scode,
//       1,
//       100,
//       ["2 12 13", "2 156 125"],
//       ["12 13", "156 125"]
//     )
//   );
// })();

module.exports = compileANDjudge;
