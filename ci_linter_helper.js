// const {
//     GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES
//   } = process.env;

// console.log(GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES)

// const event = require(GITHUB_EVENT_PATH);

// console.log(event)

// const { ESLint } = require("eslint");

// (async function main() {
//   // 1. Create an instance.
//   const eslint = new ESLint();

//   // 2. Lint files.
//   const results = await eslint.lintFiles(["lib/**/*.js"]);

//   // 3. Format the results.
//   const formatter = await eslint.loadFormatter("json");
//   const resultText = formatter.format(results);

//   // 4. Output it.
//   console.log(resultText);
// })().catch((error) => {
//   process.exitCode = 1;
//   console.error(error);
// });

var exec = require('child_process').exec;

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

result("git checkout master", function(err, response) {
    if(!err) {
        console.log(response)
    } else {
        console.log("ERRO")
        console.log(err)
    }
})