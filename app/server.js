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
    res.render("index.ejs", {data: response.data});
   }catch(err){
    res.status(404).send(`An erro ocurred ${err}`);
   }
});

app.listen(PORT, ()=>{
    console.log(`The server is running in the port ${PORT}`);
});