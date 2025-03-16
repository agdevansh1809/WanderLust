const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listing.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

main().then(()=>{
    console.log("DB is Connected");
}).catch((err)=>{
    console.log("Error is:",err)
});
const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,owner:'67d01eea5ef645ebbebfc7a4'}));
    await Listing.insertMany(initdata.data);
    console.log("Data is inserted succesfully");
}

initDB();
