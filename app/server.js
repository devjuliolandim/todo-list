import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
const API_URL = "http://localhost:4000";

//Middlewares
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Route to get all tasks
app.get("/", async (req, res)=>{
   try{
    const response = await axios.get(API_URL + "/tasks");
    console.log(response.data);
    res.render("index.ejs", {data: response.data});
   }catch(err){
    res.status(404).send(`An erro ocurred ${err}`);
   }
});

//Route to get the addTask.ejs
app.get("/new", (req, res)=>{
    res.render("addTask.ejs", {header: "ADD A NEW TASK"});
});

//Route to post a new task
app.post("/api/post", async (req, res)=>{
    try{
        const response = await axios.post(API_URL + "/post", req.body);
        console.log(response.data);
        res.redirect("/");
    }catch(err){
        res.status(404).send(err);
    }
});

//Route to render editTask.ejs
app.get("/edit/:id", async (req, res)=>{
    try{
        const response = await axios.get(API_URL + "/task/" + req.params.id);
        console.log(response.data);
        res.render("editTask.ejs", {header: "EDIT TASK",task: response.data});
    }catch(err){
        res.status(404).send(err);
    }
});

//Route to partially update tasks
app.post("/api/tasks/:id", async (req,res)=>{
    try{
        const response = await axios.patch(API_URL + "/tasks/"+ req.params.id, req.body);
        console.log(response.data);
        res.redirect("/");
    }catch(err){
        res.status(500).json({ message: "Error updating task" });
    }
});

//Route to delete a specific task
app.get("/api/delete/:id", async (req,res)=>{
    try{
        await axios.delete(API_URL + "/delete/" + req.params.id);
        res.redirect("/");
    }catch(err){
        res.status(500).json({message: "Error deleting post"});
    }
});

//Route to delete all tasks
app.get("/delete-all",async (req,res)=>{
    try{
        await axios.delete(API_URL + "/delete-all");
        res.redirect("/");
    }catch(err){
        res.status(404).json({message: "Error to Delete All"});
    }
});

app.listen(PORT, ()=>{
    console.log(`The server is running in the port ${PORT}`);
});