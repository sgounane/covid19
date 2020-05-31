const express=require("express");
const cors = require('cors')
const app=express();
app.use(cors())
app.use(express.static(__dirname+'/static'))
app.get("countries",(req,resp)=>{
    resp.json()
})
app.listen(3000,()=>console.log('go'));