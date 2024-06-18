import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

const app = express();
const PORT = 4000;

env.config();

const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
});

db.connect();

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

//Async Functions
async function fetchDatabase(){
    try{
        const result = await db.query("SELECT * FROM todo_list");
        tasks = result.rows;
    }catch(err){
        console.error("An error has ocurred fetching the database", err);
    }
}

async function insertIntoDatabase(newTask){
    try{
        await db.query("INSERT INTO todo_list (title,date) VALUES ($1,$2)", [newTask.title, newTask.date]);
    }catch(err){
        console.error("An error has occured inserting data into DB", err);
    }
}

//Tasks
let tasks = [];

//Get all tasks
app.get("/tasks", async (req, res)=>{
    await fetchDatabase();
    res.json(tasks);
});

//Get a specific task
app.get("/task/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const searchIndex = tasks.findIndex((p)=> p.id = id);

    res.json(tasks[searchIndex]);
});

//Post a new task
app.post("/post", async (req,res)=>{
    const newPost = {
        title: req.body.title,
        date: formatDate(new Date())
    }
    await insertIntoDatabase(newPost);
    res.status(201).json(tasks);
});

//Patch a task
app.patch("/tasks/:id", (req,res)=>{
    const task = tasks.find((p)=> p.id === parseInt(req.params.id));

    if(!task) return res.status(404).json({message: "Error to find task"});

    if(req.body.title) task.title = req.body.title;

    res.json(task);
});

//Delete an id Task
app.delete("/delete/:id", (req, res)=>{
    const index = tasks.findIndex((p)=> p.id === parseInt(req.params.id));

    tasks.splice(index, 1);
    res.json({message: "Post Deleted"});
});

//Delete All tasks
app.delete("/delete-all", (req,res)=>{
    tasks = [];
    res.json({message: "All tasks deleted"});
});

app.listen(PORT, (req, res)=>{
    console.log(`The server is running in the port ${PORT}`);
});