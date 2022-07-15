module.exports = messages_send


async function messages_send() {
    const { ClientBuilder } = require('@iota/client')
    const client = new ClientBuilder()
        .node('http://140.120.55.86:14265')
        .build()
        // https:/domaim/IOTA_api_14265/
        // .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
        // .build()
    // client.getInfo().then(console.log).catch(console.error)
    const message = await client.message()
            .index('DEMO11-kevin-Green-energy')
            .data('{"testk": "testvk","timek": "k1timev"}')
            .submit();
    end_time = new Date().getTime();
    console.log(message);
    return end_time
    
}