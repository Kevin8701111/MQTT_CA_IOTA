const Iota = require('@iota/core');
require('dotenv').config();
const iota = Iota.composeAPI({
 provider: process.env.provider
});

var promise = iota.getNodeInfo()
                    .then(info => {
                        console.log(info);
                        // Basic check whether node is in sync or not
                        // Elementary rule is that "latestMilestoneIndex" should equal to "latestSolidSubtangleMilestoneIndex" or be very close
                        if (Math.abs(info['latestMilestoneIndex'] - info['latestSolidSubtangleMilestoneIndex']) > 3) {
                            console.log('\r\nNode is probably not synced!');
                        } else {
                            console.log('\r\nNode is probably synced!');
                        }
                    })
                    .catch(error => {
                        console.log('Request error: ${error.message}')
                    });
