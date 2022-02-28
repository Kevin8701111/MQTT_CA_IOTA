const { SingleNodeClient } = require("@iota/iota.js");

async function run() {
    const client = new SingleNodeClient("https://chrysalis-nodes.iota.org");

    const info = await client.info();
    console.log("Node Info");
    console.log("\tName:", info.name);
    console.log("\tVersion:", info.version);
    console.log("\tIs Healthy:", info.isHealthy);
    console.log("\tNetwork Id:", info.networkId);
    console.log("\tLatest Milestone Index:", info.latestMilestoneIndex);
    console.log("\tConfirmed Milestone Index:", info.confirmedMilestoneIndex);
    console.log("\tPruning Index:", info.pruningIndex);
    console.log("\tFeatures:", info.features);
    console.log("\tMin PoW Score:", info.minPoWScore);
}

run()
    .then(() => console.log("Done"))
    .catch((err) => console.error(err));
