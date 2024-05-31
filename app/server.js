import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", async (req, res)=>{
   try{
    const response = await axios.get(API_URL + "/posts");
    console.log(response.data);
    res.render("index.ejs", {data: response.data});
   }catch(err){
    res.status(404).send(`An erro ocurred ${err}`);
   }
});

app.get("/new", (req, res)=>{
    res.render("addTask.ejs", {header: "ADD A NEW TASK"});
});

//POST A NEW TASK
app.post("/api/post", async (req, res)=>{
    try{
        const response = await axios.post(API_URL + "/post", req.body);
        console.log(response.data);
        res.redirect("/");
    }catch(err){
        res.status(404).send(err);
    }
});

//DELETE ROUTES
app.get("/api/delete/:id", async (req,res)=>{
    try{
        await axios.delete(API_URL + "/delete/" + req.params.id);
        res.redirect("/");
    }catch(err){
        res.status(500).json({message: "Error deleting post"});
    }
});

app.listen(PORT, ()=>{
    console.log(`The server is running in the port ${PORT}`);
});