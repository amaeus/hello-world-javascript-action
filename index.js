const core = require('@actions/core');
const github = require('@actions/github');

const now = new Date();

// Current date-based version prefix "vYYYY.MM."
const prefix = `v${now.getFullYear()}.${now.getMonth() + 1}.`;


try {
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
    console.log("CURRENT BRANCH: " + currentBranch);


} catch (error) {
    core.setFailed(error.message);
}
