

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://clusterUser1:aaa@cluster0-shard-00-00-3o8ig.mongodb.net:27017,cluster0-shard-00-01-3o8ig.mongodb.net:27017,cluster0-shard-00-02-3o8ig.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

MongoClient.connect(uri, function(err, client) {
    if(err) throw err;
   var collection = client.db("test").collection("devices");
   // perform actions on the collection object
   //console.log("connected to database");
/*
   var myObject={ncourseName:"Computational structure",courseID:'istd.term4',numberOfStudents:150,numberOfClasses:3,instructor:["Oka","Natalie"]};
   collection.insertOne(myObject,function(err,res){
       if(err)throw err;
       console.log("succefully inserted!");
       client.close();
   });

   collection.insertMany([{courseName:"Intro to Java",courseID:"istd.term4.50.001",numberOfClasses:3,instructor:["man","norman"]},
   {courseName:"Intro to JAlgorithm",courseID:"istd.term4.50.004",numberOfClasses:3,instructor:["Gemma"]}],function(err,res){
       if(err)throw err;
       console.log("successfully insert many!");
       console.log(res.insertedCount);
       client.close();
   });
*/
/*
   collection.find({}).toArray(function(err,result){
       //return all data in the collection
       if(err)throw err;
       //console.log(result);
       client.close();
   });
   */
/*
   collection.updateOne({courseName:"Intro to Java"},{$set:{numberOfClasses:20}},function(err,res){
       if(err)throw err;
       console.log("successfully updated!");
       client.close();
   })
*/
/*
   collection.deleteMany({courseName:"Computational structure"},function(err,obj){
       if(err)throw err;
       console.log("successfully deleted!");
       client.close();
   })
*/
/*
   collection.find({courseName:"Computational structure"}).toArray(function(err,result){
       if(err) throw err;
       //console.log(result);
       client.close();
   
   });
*/


   ////////////////////////////////////////////////////////////////////////
   // Insertion and avoid repetitive information entered
   var insertion1={courseName:'Intro to Algorithm',courseID:50.004,instructor:["Gemma"],week:2,day:4};
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