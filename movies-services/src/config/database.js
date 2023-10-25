const MongoClient = require('mongodb').MongoClient;

// O QUE VALE E ESSE AQUI , ESSA AQUI E CONEXAO MAIS ATUALIZADA

let client=null;

async function connect(){
    if(!client)
        client = new MongoClient(process.env.MONGO_CONNECTION);
    console.log("inicio") 
    await client.connect();//so pode utilizar dentro de funcoes async
    console.log("fim")
    return client.db(process.env.DATABASE); 
}

async function disconnect(){
    if(! client) return true;
    await client.close();
    client=null;
    return true;
}

module.exports ={connect,disconnect}