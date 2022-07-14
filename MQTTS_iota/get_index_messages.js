async function run() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().node('http:/140.120.55.86:14265').build();

    // get message data by message id (get a random message id with getTips)
    const message_data = await client.getMessage().data('8a53c0a9c99978993591cf4e47f44ba949e49474d43e7e278a9e8fe527f8bed2');
    const message_metadata = await client.getMessage().metadata('8a53c0a9c99978993591cf4e47f44ba949e49474d43e7e278a9e8fe527f8bed2');
    console.log(message_metadata);
    console.log(message_data);

    // get indexation data by index
    const message_ids = await client.getMessage().index("Kevin-client1")
    for (message_id of message_ids) {
        const message_wrapper = await client.getMessage().data(message_id)
        console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    }
}

run()
