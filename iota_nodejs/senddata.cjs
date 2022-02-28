import * as iotak from "./node_modules/@iota/iota.js";

const { Converter } = require("@iota/util.js");

const API_ENDPOINT = "https://chrysalis-nodes.iota.org";

async function run() {
    const client = new iotak.SingleNodeClient(API_ENDPOINT);

    const myIndex = Converter.utf8ToBytes("nchu_ee_kevin_node119");

    for (let i = 0; i < 10; i++) {
        console.log("Sending Data");
        const sendResult = await iotak.sendData(client, myIndex, Converter.utf8ToBytes('{"name":"kevin1"}'));
        console.log("Received Message Id", sendResult.messageId);
        console.log(`https://explorer.iota.org/mainnet/message/${sendResult.messageId}`);
    }

    console.log();
    console.log("Finding messages with index");

    const found = await client.messagesFind(myIndex);

    if (found && found.messageIds.length > 0) {
        console.log(`Found: ${found.count} of ${found.maxResults}`);

        const firstResult = await iotak.retrieveData(client, found.messageIds[0]);
        if (firstResult) {
            console.log("First Result");
            console.log("\tIndex: ", Converter.bytesToUtf8(firstResult.index));
            console.log("\tData: ", firstResult.data ? Converter.bytesToUtf8(firstResult.data) : "None");
        }
    } else {
        console.log("Found no results");
    }
}

run()
    .then(() => console.log("Done"))
    .catch(err => console.error(err));
