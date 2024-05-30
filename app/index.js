import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

//MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Functions

function formatDate(date){

    //       MM/DD/YYYY
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();

    // HOURS

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month}/${day}/${year} - ${hours}:${minutes}`
}

//Posts
let posts = [
    {
        title: "Do the dishes",
        date: formatDate(new Date())
    },
    {
        title: "Clean the kitchen",
        date: formatDate(new Date())
    }
];

app.get("/posts", (req, res)=>{
    res.json(posts);
});

app.listen(PORT, (req, res)=>{
    console.log(`The server is running in the port ${PORT}`);
});