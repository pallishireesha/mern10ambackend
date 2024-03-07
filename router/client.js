
let express = require("express");
require("../dbconfig"); //not reusing 
let cors = require('cors');
let Client = require("../client"); //iam going to reuse in another
let app = express();

let clientRouter = express.Router();

app.use(express.json());
app.use(cors());

clientRouter.get("/",async(req,res)=>{
let user=await Client.find();
res.send(user);
});

clientRouter.post("/", async(req,res)=>{
    let user = new Client(req.body);
    let result = await user.save();
   // res.send("<h1>Added client Data</h1>");
   res.send(result);
});

clientRouter.delete("/:id", async (req,res)=>{
//let user =await client.deleteOne({_id:req.params.id}); or
/*let user =await client.deleteOne({_id:req.params.id},(err,doc)=>{
    if(err) throw err;
   res.send(doc);
});*/
let user =await Client.deleteOne({_id:req.params.id})
.then(ress=>{
    res.send("deleted");
})
.catch(err=>{
    res.send("unable to delete");
})
res.send(user);
});

clientRouter.get("/:id",async(req,res)=>{
    let user=await Client.findOne({_id:req.params.id});
    res.send(user);
    });
    
    clientRouter.put("/:id",async(req,res)=>{
        let user=await Client.updateOne({_id:req.params.id},{$set:req.body});
        res.send(user);
        });
module.exports = clientRouter;