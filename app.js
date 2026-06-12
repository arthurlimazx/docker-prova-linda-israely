
const express = require('express');
const app = express();

app.get('/', (req,res)=>res.send('Sistema de eventos'));

app.listen(3000, ()=>{
  console.log('Rodando');
});
