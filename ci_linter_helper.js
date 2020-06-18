// const {
//     GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES
//   } = process.env;

// console.log(GITHUB_EVENT_PATH, GITHUB_SHA, GITHUB_TOKEN, GITHUB_WORKSPACE, ESLINT_RC, EXECUTE_ON_FILES)

// const event = require(GITHUB_EVENT_PATH);

// console.log(event)

const { ESLint } = require("eslint");
const bash_exec = require("./exec_process.js")
const fs = require('fs')

async function run(files) {
  // 1. Create an instance.
  const eslint = new ESLint();

  // 2. Lint files.
  files = files.filter((file) => {
      return fs.existsSync(file)
  })
  console.log(files)
  const results = await eslint.lintFiles(files);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("json");
  const resultText = formatter.format(results);

//   // 4. Output it.
//   console.log("Inside linter run", resultText);
  return results
}

async function run_linter(cb) {
    bash_exec.run_bash_cmd("git diff --name-only HEAD origin/master", async function(err, response) {
        if(!err) {
            let files = response.split("\n").filter((file_name) => {
                return file_name.indexOf(".js") !== -1 && !file_name.includes("node_modules")
            })

            let source_report = await run(files)
            // console.log(source_report)
            bash_exec.run_bash_cmd("git checkout master", async function(err, response) {
                if(!err) {
                    let target_report = await run(files)
                    cb(source_report, target_report)
                    // console.log(target_report)

                    // console.log("SOURCE: ", source_report)
                    // console.log("TARGET: ", target_report)
                    // return source_report, target_report
                } else {
                    console.log(err)
                }
            })
        } else {
            console.log(err)
        }
    })
}

function do_linter_checks(source_report, target_report) {
    console.log("SOURCE: ", source_report)
    console.log("TARGET: ", target_report)
    let source_total_offenses =  source_report.map( file => file.errorCount ).reduce((total, current) => {
        return total+current
    })
    let target_total_offenses =  target_report.map( file => file.errorCount ).reduce((total, current) => {
        return total+current
    })
                                       
    console.log("SOURCE: ", source_total_offenses)
    console.log("TARGET: ", target_total_offenses)

    if (source_total_offenses > target_total_offenses) {
        console.log("You nasty boy have incremented the number os offenses")
        source_hash = calculate_hash_obj(source_report)
        target_hash = calculate_hash_obj(target_report)

        console.log("SOURCE HASH: ", source_hash)
        console.log("TARGET HASH: ", target_hash)
    } else {
        console.log("Congrats you've managed to not increase the number os offenses")
    }
}

function calculate_hash_obj(report) {
    hash = {}

    report.forEach( (file, index) => {
        hash[file.filePath] = { }

        file.messages.forEach( (offense, index) => {
            if (!offense.ruleId.toString() in hash[file.filePath]) {
                hash[file.filePath][offense.ruleId.toString()] = 1
                console.log(hash[file.filePath])
            } else {
                // console.log("What about here", offense.ruleId, hash[file.filePath])
                hash[file.filePath][offense.ruleId.toString()] += 1
            }
        })
    })

    return hash
}

(async function main() {
    run_linter(do_linter_checks)
})()