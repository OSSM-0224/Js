import createApp from "./src/app.js";

const app = createApp;

const PORT = 3000;

function startServer(){
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
}   