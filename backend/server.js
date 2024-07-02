// Handling Uncaught Exception errors
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception errors");

    process.exit(1);
})

// console.log(a);

const app = require("./app.js");
const dotenv = require("dotenv");
//Config : by doing this process.env = contents of config.env
dotenv.config({path: "backend/config/config.env"});

const connectDatabase = require("./config/database.js");
connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server working on http://localhost:${process.env.PORT}`); //value of PORT from config.env file
})


// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
});