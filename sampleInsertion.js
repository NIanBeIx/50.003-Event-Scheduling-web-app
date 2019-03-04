var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://clusterUser1:aaa@cluster0-shard-00-00-3o8ig.mongodb.net:27017,cluster0-shard-00-01-3o8ig.mongodb.net:27017,cluster0-shard-00-02-3o8ig.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, function(err, client) {
    if(err) throw err;
   var collection = client.db("test").collection("devices");


   ////////////////////////////////////////////////////////////////////////
   // Insertion and avoid repetitive information entered
   var insertion1={courseName:'Intro to Algorithm',courseID:50.004,instructor:["Gemma"],week:7,day:4};
   var permission=false;
   var controller=0;

   collection.find(insertion1).toArray(function(err,result){
       if(err)throw err;
       controller=controller+1;
       if(result.length==0){
            permission=true;
            if(controller==1){
                if(permission==true){
                    collection.insertOne(insertion1,function(err,res){
                        if (err)throw err;
                        console.log("successfully inserted");
                        client.close();
                    });
                }
            }
        }else{
            console.log("insertion already existed...");
        }
        controller=0;
        client.close();
   });

});