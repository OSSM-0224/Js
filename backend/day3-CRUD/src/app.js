let express  =  require('express');
const connectDb = require('./config/db');

connectDb();

let app = express();

app.use(express.json());

let users = [
];

app.post('/get-users',(req, res) =>{
    users.push(req.body);

    return res.status(201).json({
        message:"User Created Successfully",
        data:req.body
    });
})

app.get('/users', (req, res) => {
    return res.status(200).json({
        message:"Users Fetched Successfully",
        data:users
    })
})

app.patch('/users/update/:index', (req,res) => {

    let {index} = req.params;
    console.log(index)

    users[index].age = 80;

    return res.send("Ok");
}) 

app.delete('/users/delete/:index', (req, res) => {
    let {index} = req.params;
    return res.status(200).json
})

module.exports = app;