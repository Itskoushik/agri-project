const express =require('express');
const mysql = require('mysql')
const cors = require('cors')



const app = express()
app.use(cors())

app.get( '/', (re, res) => {
    return res.json("from backend side");
})

app.listen(8081, ()=>{
    console.log("server is running on port 8081");
})