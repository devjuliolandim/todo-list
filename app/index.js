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
        id: 1,
        title: "Do Add Task Button",
        date: formatDate(new Date())
    },
    {
        id:2,
        title: "Clean the kitchen",
        date: formatDate(new Date())
    }
];

let lastID = 2;

app.get("/posts", (req, res)=>{
    res.json(posts);
});

app.post("/post", (req,res)=>{
    console.log(req.body);
    
    lastID += 1;

    const newPost = {
        id: lastID,
        title: req.body.title,
        date: formatDate(new Date())
    }

    posts.push(newPost);
    res.status(201).json(posts);
});

app.delete("/delete/:id", (req, res)=>{
    const index = posts.findIndex((p)=> p.id === parseInt(req.params.id));

    posts.splice(index, 1);
    res.json({message: "Post Deleted"});
});

app.listen(PORT, (req, res)=>{
    console.log(`The server is running in the port ${PORT}`);
});