const express=require('express');
const path=require('path');
const app=express();

app.use(express.static(path.join(__dirname,'/public')));

app.use(express.json());

const basic_network_router=require('./routes/basic_network_router');
app.use('/basic_network',basic_network_router);

app.listen(3000, ()=>{
    console.log('3000 server ready...');
});

