const request = require('request');
let date = new Date();
const num = (n)=>{
    return n < 10 ? '0' + n:n;
}
const formatDate = (current_datetime)=>{
    let formatted_date = current_datetime.getFullYear()
    + "/" + num(current_datetime.getMonth() + 1) + "/" + num(current_datetime.getDate()-1)
    return formatted_date;
}
let datetime = formatDate(date)

let sunVeillance = 'https://gms.auo.com/BenQWebDBsource/CrossPlantsManagement\
/GetHealthRating?Act=gSkaoAEhn0K3mUDcNAg2%2bJIrdEFHn7MyI1jorK82%2f8E%3d&authority\
=t3DUq4JeJSh9dsutKFwZVw%3d%3d&sdate='+datetime+'&edate='+datetime

request({url:sunVeillance,json: true},(error,response,body) =>{
    let data_json = JSON.parse(JSON.stringify(body));
    delete data_json[0].YesterdayAverageEnergy
    delete data_json[0].TodayAverageEnergy
    delete data_json[0].TodayAverageEnergy
    delete data_json[0].Alert_flag
    delete data_json[0].Alert_Num
    delete data_json[0].PlantShare
    delete data_json[0].Description
    delete data_json[0].PlantType
    delete data_json[0].InstallerCom
    delete data_json[0].State_en
    delete data_json[0].InstallerRegDate
    delete data_json[0].InternetAccess
    delete data_json[0].PlantMainPic
    delete data_json[0].QueryField
    delete data_json[0].Module_Model
    delete data_json[0].SW_Version
    delete data_json[0].SW_Version_Old
    delete data_json[0].Mounting_Type
    delete data_json[0].Energy_Yield
    delete data_json[0].module_temperature
    delete data_json[0].ambient_temperature
    delete data_json[0].KW_PR
    delete data_json[0].num
    delete data_json[0].total_ac_kwh
    delete data_json[0].site_count
    delete data_json[0].longitude
    delete data_json[0].latitude
    delete data_json[0].ACCOUNT_LOGO
    delete data_json[0].Owner
    delete data_json[0].City
    delete data_json[0].State
    delete data_json[0].County
    data_json[0]['datetime'] = datetime;
    console.log(data_json)
    run(JSON.stringify(data_json))
})

async function run(data) {
    const { ClientBuilder } = require('@iota/client')
    // https:/kevintw.nchu.edu.tw
    const client = new ClientBuilder()
        .node('http:/127.0.0.1:14265')
        .build()
        // .node('https://api.lb-0.h.chrysalis-devnet.iota.cafe')
        // .build()
    // client.getInfo().then(console.log).catch(console.error)
    const message = await client.message()
            .index('DEMO2-kevin-Green-energy')
            .data(data)
            .submit();

        console.log(message);
}

