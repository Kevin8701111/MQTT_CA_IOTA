var message_send = require('./message_send');


start_time = new Date().getTime();

return message_send().then(end_time => {
    console.log(end_time-start_time+'ms');
  });;



