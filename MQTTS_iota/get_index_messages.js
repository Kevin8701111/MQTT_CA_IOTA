module.exports = get_index_messages

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        // 使用  continue 实现；
        continue; 
    }
  }
async function get_index_messages() {
    const { ClientBuilder } = require('@iota/client');

    // client will connect to testnet by default
    const client = new ClientBuilder().node('http://140.120.55.86:14265').build();

    // get message data by message id (get a random message id with getTips)
    const message_data = await client.getMessage().data('3c6c19c2873f46cfcfeca9aa0f6980f5a465c31361fa67014949e5857d2b2743');
    // const message_metadata = await client.getMessage().metadata('3c6c19c2873f46cfcfeca9aa0f6980f5a465c31361fa67014949e5857d2b2743');
    // console.log(message_metadata);
    console.log(message_data);

    // get indexation data by index
    // const message_ids = await client.getMessage().index('DEMO11-kevin-Green-energy')

    
    // for (message_id of message_ids) {
    //     const message_wrapper = await client.getMessage().data(message_id)
    //     console.log(Buffer.from(message_wrapper.message.payload.data, 'hex').toString('utf8'));
    // }
    end_time = new Date().getTime();
    return end_time
}