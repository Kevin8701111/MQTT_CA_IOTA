var get_index_messages = require('./get_index_messages');
// var array = [];
start_time = new Date().getTime();
// for (let i = 0; i < 5; i++) {
// get_index_messages().then(end_time => {
//         array.push(end_time-start_time+'ms');
//         console.log(end_time-start_time+'ms');
//       });
// }
// console.log('array')
// console.log(array)
// console.log('array')

get_index_messages().then(end_time => {
  // array.push(end_time-start_time+'ms');
  console.log(end_time-start_time+'ms')
})