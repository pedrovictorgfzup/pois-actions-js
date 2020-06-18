// const {
//     GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES
//   } = process.env;

// console.log(GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES)

// const event = require(GITHUB_EVENT_PATH);

// console.log(event)

const { ESLint } = require("eslint");
const bash_exec = require("./exec_process.js")

let files = null
let resulthead = null

async function run() {
  // 1. Create an instance.
  const eslint = new ESLint();

  // 2. Lint files.
  console.log(files)
  const results = await eslint.lintFiles(files);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("json");
  const resultText = formatter.format(results);

//   // 4. Output it.
//   console.log("Inside linter run", resultText);
  return resultText
}



bash_exec.run_bash_cmd("git diff --name-only HEAD origin/master", async function(err, response) {
    if(!err) {
        response_array = response.split("\n")

        files = response_array.filter((item) => {
            return item.indexOf(".js") !== -1 && !item.includes("node_modules")
        })

        resulthead = await run().catch((error) => {
            if (error.messageTemplate === 'file-not-found') {
                files = files.filter((file) => {
                    return file !== error.messageData["pattern"]
                })

                run();
            } else {
                process.exitCode = 1;
                console.error(error);
                }
          });
        console.log(resulthead)
    } else {
        console.log(err)
    }
})

bash_exec.run_bash_cmd("git checkout master", function(err, response) {
    if(!err) {
        run().catch((error) => {
            process.exitCode = 1;
            console.error(error);
          });
    } else {
        console.log(err)
    }
})