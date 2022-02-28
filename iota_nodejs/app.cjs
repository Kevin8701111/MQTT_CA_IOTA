const Iota = require('@iota/core');
const Converter = require('@iota/converter');
require('dotenv').config();

const iota = Iota.composeAPI({
    provider: process.env.provider,
});

const depth = 3;

const minimumWeightMagnitude = 9;

const seed = process.env.seed

const main = async () => {
    const receivingAddress = process.env.seed
    const message = JSON.stringify({"testk": "testvk","timek": "k1timev"});
    const messageInTrytes = Converter.asciiToTrytes(message);
    const transfers = [
        {
            value: 0,
            address: receivingAddress,
            message: messageInTrytes,
        },
    ];
    console.log('Sending 10i to ' + receivingAddress);
    try {
        const trytes = await iota.prepareTransfers(seed, transfers);
	console.log('111111111111111111');
        const response = await iota.sendTrytes(
            trytes,
            depth,
            minimumWeightMagnitude
        );
	console.log('222222222222222222');
        console.log('Bundle sent');
        response.map((tx) => console.log(tx));
    } catch (error) {
	console.log('33333333333333333333333333333');
        console.log(error);
    }
};

main();
