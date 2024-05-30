import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

//MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Posts
let posts = [
    {
        id: 1,
        title: "Do the dishes",
        date: new Date()
    },
    {
        id: 2,
        tite: "Clean the kitchen",
        date: new Date()
    }
];

app.get("/posts", (req, res)=>{
    res.json(posts);
});

app.listen(PORT, (req, res)=>{
    console.log(`The server is running in the port ${PORT}`);
});