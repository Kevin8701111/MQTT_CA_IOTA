const Iota = require('@iota/core');
require('dotenv').config();
const seed = process.env.seed
const index = 0;
const securityLevel = 3;
const addrCnt = 2;

const iota = Iota.composeAPI({
    provider: process.env.provider,
});

iota.getNewAddress(seed, {
    index: index,
    securityLevel: securityLevel,
    total: addrCnt,
})
    .then((address) => {
        console.log('Your address is: ' + address);
    })
    .catch((err) => {
        console.log(err);
    });

