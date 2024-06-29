const app = require("./app.js");
const dotenv = require("dotenv");
//Config : by doing this process.env = contents of config.env
dotenv.config({path: "backend/config/config.env"});

const connectDatabase = require("./config/database.js");
connectDatabase();


app.listen(process.env.PORT,()=>{
    console.log(`Server working on http://localhost:${process.env.PORT}`); //value of PORT from config.env file
})