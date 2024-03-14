const express = require('express');
const app = express();


app.get('/', (req,res) =>{
  res.send('hello woreld from node.js server');
});

app.use(express.static('../dist/todo-list'));

app.listen(3030, ()=> {
  console.log(`server listening at `);
})


