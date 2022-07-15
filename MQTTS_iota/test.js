var get_index_messages = require('./get_index_messages');


start_time = new Date().getTime();
for (let i = 0; i < 5; i++) {
get_index_messages().then(end_time => {
        console.log(end_time-start_time+'ms');
      });;
}