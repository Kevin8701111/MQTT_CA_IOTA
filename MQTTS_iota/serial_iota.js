const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

function getDateISO(dateNew) {
    let ISOTime = dateNew.toISOString('zh-TW', {
            timeZone: 'Asia/Taipei',
            hour12: false
        })
    return ISOTime
}

function getDateString(dateSplit) {
    let date = ("0" + dateSplit.getDate()).slice(-2);
    let month = ("0" + (dateSplit.getMonth() + 1)).slice(-2);
    let year = dateSplit.getFullYear();
    let hours = dateSplit.getHours();
    let minutes = dateSplit.getMinutes();
    let seconds = dateSplit.getSeconds();

    var dateTime = hours + ":" + minutes + ":" + seconds
    var dateDay = year + "/" + month + "/" + date

    return {'dateTime':dateTime, 'dateDay':dateDay}
}

var port;
function connect() {
    port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 },() => {})
    const parser =  port.pipe(new ReadlineParser({ delimiter: '\r\n'}))
    port.open(() => {
        port.on('open',() => {
        console.log('port open')
        parser.on('data',(arduinoData) => {
            const dateNew = new Date();
            const dateSplit = new Date(+new Date() + 8 * 3600 * 1000);
            let dataJson = JSON.parse(arduinoData);
            dataJson['iso_time'] = getDateISO(dateNew);
            dateString2v = getDateString(dateSplit);
            dataJson['date_time'] = dateString2v.dateTime
            dataJson['date_day'] = dateString2v.dateDay
            console.log(dataJson)
            run(JSON.stringify(dataJson))
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

async function run(data) {
    const { ClientBuilder } = require('@iota/client')
    const client = new ClientBuilder()
        .node('http:/140.120.55.86:14265')
        .build()
        // https:/domaim/IOTA_api_14265/
        // .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
        // .build()
    // client.getInfo().then(console.log).catch(console.error)
    const message = await client.message()
            .index('DEMO8-kevin-Green-energy')
            .data(data)
            .submit();
        console.log(message);
}
