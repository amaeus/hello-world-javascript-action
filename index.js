const core = require('@actions/core');
const github = require('@actions/github');
var shell = require('shelljs');

const now = new Date();

// Current date-based version prefix "vYYYY.MM."
const prefix = `v${now.getFullYear()}.${now.getMonth() + 1}.`;


try {

    // default branch for this repository (as it is set in GH repository settings)
    const defaultBranch = github.context.payload.repository.default_branch;


    const currentBranch = github.context.ref;

    let prefix = `v${now.getFullYear()}.${now.getMonth() + 1}`

    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');

    // console.log(`Hello ${nameToGreet}!`);

    const time = now.toTimeString();

    core.setOutput("time", time);

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);


    console.log("DEFAULT BRANCH: " + defaultBranch);
    // console.log(`CURRENT BRANCH:  ${} `);


    let cmd = 'git branch --format=\'%(refname:short)\'';
    let out = shell.exec(cmd).stdout;

    // let out = child_process.execSync(cmd, (err, stdout, stderr) => {
    //     if (err) {
    //         console.error(`Unable to find an earlier tag.\n${stderr}`);
    //         return;
    //     }
    //     console.log(`Outputting tag: ${stdout.trim()}`)
    //     return stdout.trim();
    // });

    console.log(`OUT: '${out}'`)

} catch (error) {
    core.setFailed(error.message);
}
