var mongoose = require('mongoose');
    var songsSchema = new mongoose.Schema({Singer: String, Title: String, Link: String});
    mongoose.model('Songs', songsSchema);
var db = mongoose.createConnection('mongodb://petsov:trooper3421@widmore.mongohq.com:10000/FestsDB');
db.on('open', function(){
    console.log("success");
    var Song = db.model('Songs', songsSchema);
    var song1 = new Song({Singer: "Joe Cocker", Title: "Sex Bomb", Link: "test"});
    song1.save(function(err, song1){
        if(err){
            console.log(err);
        }
        else {
        console.log("saved123");
        }
    });
    });
db.on('error', function(error){
    console.log(error);
    console.log("error2");
    });
    
