const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

var port;
function connect() {
    port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 },() => {})
    const parser =  port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
    port.open(() => {
        port.on('open',() => {
        console.log('port open')
        parser.on('data',(data) => {
            console.log(data)
        }) 
    })
})
    
    port.on('close',() => {
        console.log('close')
    })

    port.on('open',() => {
        console.log('open')
    })

}
connect()

setInterval(() => {
    port.get((err) => {
        if (err) {
            setTimeout(()=>{
                connect()
              },1000)
        }
    })
}, 1000)

