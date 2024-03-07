
let express = require("express");
require("../dbconfig"); //not reusing 
let cors = require('cors');
let Student = require("../student"); //iam going to reuse in another
let app = express();

let studentRouter = express.Router();

app.use(express.json());
app.use(cors());

studentRouter.get("/",async(req,res)=>{
let user=await Student.find();
res.send(user);
});

studentRouter.post("/", async(req,res)=>{
    let user = new Student(req.body);
    let result = await user.save();
   // res.send("<h1>Added Student Data</h1>");
   res.send(result);
});

studentRouter.delete("/:id", async (req,res)=>{
//let user =await Student.deleteOne({_id:req.params.id}); or
/*let user =await Student.deleteOne({_id:req.params.id},(err,doc)=>{
    if(err) throw err;
   res.send(doc);
});*/
let user =await Student.deleteOne({_id:req.params.id})
.then(ress=>{
    res.send("deleted");
})
.catch(err=>{
    res.send("unable to delete");
})
res.send(user);
});

studentRouter.get("/:id",async(req,res)=>{
    let user=await Student.findOne({_id:req.params.id});
    res.send(user);
    });
    
studentRouter.put("/:id",async(req,res)=>{
        let user=await Student.updateOne({_id:req.params.id},{$set:req.body});
        res.send(user);
        });

studentRouter.get('/search/:key',async(req,res)=>{
    let user = await Student.find({
        $or: [
           { name: {$regex:req.params.key}} ,
           { email: {$regex:req.params.key}} ,
           { address: {$regex:req.params.key}} ,
        ],
    });
    res.send(user);
});

module.exports = studentRouter;