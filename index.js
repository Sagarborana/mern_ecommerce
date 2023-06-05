require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const server = express();
const path = require('path')
const productRouter = require('./routes/product');
const { mongoose } = require('mongoose');
const cors = require('cors')


async function main(){
  await mongoose.connect(process.env.MONGO_URL ,{family: 4})
  console.log('database connected')
}

//bodyParser
server.use(cors())
server.use(express.json());
server.use(morgan('dev'));
// server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR)));
server.get('/',(req,res)=>{
  res.send("Hi, I am live")
})
server.use('/api/products',productRouter.router);



main().catch(err => console.log(err))

server.listen(process.env.PORT, () => {
  console.log('server started');
});
