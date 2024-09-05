import bodyParser from "body-parser";
import { name } from "ejs";
import express, { response } from "express";
const app = express();
const port = 3000;
const postArray = [{title: "good info", author: "cool name", text: "Your brain is more active during sleep, especially in REM sleep, than when you're awake."},{title: "bad info", author: "bad name", text: "We touch our faces 16-23 times an hour, increasing the risk of spreading germs and getting sick."}];
const profile = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req,res)=>{
    res.render("index.ejs", {
        postArray: postArray
    });
});
app.get("/header", (req,res)=>{
    res.render("partials/header.ejs")
})
app.get("/profile", (req,res)=>{
    res.render("profile.ejs", {postArray: postArray,profile:profile });
    console.log(profile)
});
app.get("/createpost",(req,res)=>{
    res.render("createpost.ejs")
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})


app.post("/submit", (req,res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const text = req.body.text;
    const post = {
        title: title,
        author: author,
        text: text
    }
    postArray.push(post);
    res.render("index.ejs",{name:profile[0], postArray:postArray});


});
app.post("/edit",(req,res)=>{
    const id = req.body.postid;

    res.render("createpost.ejs", {id:id,postArray:postArray})

});
app.post("/update",(req,res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const text = req.body.text;
    const postid = req.body.postid;
 const post = {
    title: title,
    author: author,
    text: text
}
postArray[postid]= post;
res.render("index.ejs",{name:profile[0], postArray:postArray});
});
app.post("/delete", (req,res)=>{
    const id = req.body.postid;
    postArray.splice(id,1);
    res.render("index.ejs",{name:profile[0], postArray:postArray});

});
app.post("/login", (req,res)=>{
    const name = req.body.name;
    profile.push(name);
    res.render("index.ejs",{name:profile[0], postArray:postArray});

});


app.listen(port, ()=>{
    console.log(`app is running on port ${port}.`);
});