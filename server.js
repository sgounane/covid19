const express=require("express");

const app=express();
app.use(express.static(__dirname+'/public'))
app.get("countries",(req,resp)=>{
    resp.json()
})
app.listen(3000,()=>console.log('go'));
