// const {
//     GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES
//   } = process.env;

// console.log(GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES)

// const event = require(GITHUB_EVENT_PATH);

// console.log(event)

const { ESLint } = require("eslint");

let files = null
let resulthead = null
var exec = require('child_process').exec;

async function run() {
  // 1. Create an instance.
  const eslint = new ESLint();

  // 2. Lint files.
  console.log(files)
  const results = await eslint.lintFiles(files);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("json");
  const resultText = formatter.format(results);

  // 4. Output it.
  console.log(resultText);
  resulthead =  resultText
}

var result = function(command, cb){
    var child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
        }else{
            return cb(null, stdout);
        }
    });
}

result("git diff --name-only HEAD origin/master", function(err, response) {
    if(!err) {
        response_array = response.split("\n")
        // console.log(response_array)
        files = response_array.filter((item) => {
            return item.indexOf(".js") !== -1 && !item.includes("node_modules")
        })
        console.log(files)
        resulthead = run()
        console.log(resulthead)
    } else {
        console.log(err)
    }
})

result("git checkout master", function(err, response) {
    if(!err) {
        run()
    } else {
        console.log(err)
    }
})