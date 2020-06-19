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

  const results = await eslint.lintFiles(files);

  // 3. Format the results.
  const formatter = await eslint.loadFormatter("json");
  const resultText = formatter.format(results);

//   // 4. Output it.
  return results
}

async function run_linter(cb) {
    bash_exec.run_bash_cmd(`git diff --name-only HEAD origin/${process.argv[2]}`, async function(err, response) {
        if(!err) {
            let files = response.split("\n").filter((file_name) => {
                return file_name.indexOf(".js") !== -1 && !file_name.includes("node_modules")
            })

            let source_report = await run(files)

            bash_exec.run_bash_cmd(`git checkout ${process.argv[2]}`, async function(err, response) {
                if(!err) {
                    let target_report = await run(files)
                    cb(source_report, target_report)
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
    let source_total_offenses =  source_report.map( file => file.errorCount ).reduce((total, current) => {
        return total+current
    })
    let target_total_offenses =  target_report.map( file => file.errorCount ).reduce((total, current) => {
        return total+current
    })

    if (source_total_offenses > target_total_offenses) {
        console.log("You nasty boy have incremented the number os offenses")
        source_hash = calculate_hash_obj(source_report)
        target_hash = calculate_hash_obj(target_report)


        for (file in source_hash) {
            if(file !== undefined || source_hash.hasOwnProperty(file)) {
                for(offense in source_hash[file]) {
                    if(offense !== undefined || source_hash[file].hasOwnProperty(offense)){
                        offense_quantity = source_hash[file][offense] - (target_hash[file] && target_hash[file][offense] || 0)
                        if (offense_quantity > 0) {
                            console.log(`${offense_quantity} ${offense} were added to ${file}`)
                        }
                    }
                }
            }
        }

        process.exit(1)
    } else {
        console.log("Congrats you've managed to not increase the number os offenses")
    }
}

function calculate_hash_obj(report) {
    hash = {}

    report.forEach( (file, index) => {
        hash[file.filePath] = { }

        file.messages.forEach( (offense, index) => {
            if (!(offense.ruleId.toString() in hash[file.filePath])) {
                hash[file.filePath][offense.ruleId.toString()] = 1
            } else {
                hash[file.filePath][offense.ruleId.toString()] += 1
            }
        })
    })

    return hash
}

(async function main() {
    run_linter(do_linter_checks)
})()