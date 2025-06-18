const cors = require("cors");
const express = require("express");
const mongoClient = require("mongodb").MongoClient;

// Create connection string and app

const conString = "mongodb+srv://sahil12:myCluster@cluster0.by9ct6q.mongodb.net/";

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Create API endpoints

app.get('/admin',(req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
        database.collection("admin").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get('/users',(req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
        database.collection("users").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get('/videos',(req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
        database.collection("videos").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.get('/videos/:id',(req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");

        database.collection("videos").findOne({video_id:id}).then(document => {
            res.send(document);
            res.end();
        });
    });
});

app.get('/categories',(req, res) => {
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");

        database.collection("categories").find({}).toArray().then(documents => {
            res.send(documents);
            res.end();
        });
    });
});

app.post('/register-user',(req, res) => {
    var user ={
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");

        database.collection("users").insertOne(user).then(() => {
            console.log('User Registered');
            res.send();
        });
    });
});

app.post('/add-video',(req, res) => {
    var video = {
        video_id: parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        dislikes: parseInt(req.body.dislikes),
        views: parseInt(req.body.views),
        category_id: parseInt(req.body.category_id)
    };

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
         database.collection("videos").insertOne(video).then(() => {
            console.log('Video Added');
            res.send();
         });
    });
});

app.put('/edit-video/:id',(req, res) => {
    var id = parseInt(req.params.id);

    var video = {
        video_id: parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req,babel,likes),
        dislikes: parseInt(req,babel.dislikes),
        views: parseInt(req.body.views),
        category_id: parseInt(req.body.category_id)
    };
    
    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
         database.collection("videos").updateOne({video_id:id},{$set: video}).then(() => {
            console.log('Video Updated');
            res.send();
        });
    });
});

app.delete('/delete-video/:id',(req, res) => {
    var id = parseInt(req.params.id);

    mongoClient.connect(conString).then(clientObject => {
        var database = clientObject.db("video-library");
         database.collection("videos").deleteOne({video_id: id}).then(() => {
            console.log('Video Deleted');
            res.send();
        });
    });  
});

app.listen(3000);
console.log(`Server Started http://127.0.0.1:3000`);