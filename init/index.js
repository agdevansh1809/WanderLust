const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listing.js");
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });



async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}

main().then(()=>{
    console.log("DB is Connected");
}).catch((err)=>{
    console.log("Error is:",err)
});
const initDB = async()=>{
    await Listing.deleteMany({});
    for(let listing of initdata.data){
        let response = await geocodingClient.forwardGeocode({
            query: listing.location,
            limit: 1
          })
            .send();
        listing.geometry = response.body.features[0].geometry;
    }
    initdata.data = initdata.data.map((obj)=>({...obj,owner:"67d73c5980984a9b4175c888"}));
    await Listing.insertMany(initdata.data);
    console.log("Data is inserted succesfully");
}

initDB();
