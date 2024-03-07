
let express = require("express");
require("../dbconfig"); //not reusing 
let cors = require('cors');
let Employee = require("../employee"); //iam going to reuse in another
let app = express();

let employeeRouter = express.Router();

app.use(express.json());
app.use(cors());

employeeRouter.get("/",async(req,res)=>{
let user=await Employee.find();
res.send(user);
});

employeeRouter.post("/", async(req,res)=>{
    let user = new Employee(req.body);
    let result = await user.save();
   // res.send("<h1>Added Employee Data</h1>");
   res.send(result);
});

employeeRouter.delete("/:id", async (req,res)=>{
//let user =await Employee.deleteOne({_id:req.params.id}); or
/*let user =await Employee.deleteOne({_id:req.params.id},(err,doc)=>{
    if(err) throw err;
   res.send(doc);
});*/
let user =await Employee.deleteOne({_id:req.params.id})
.then(ress=>{
    res.send("deleted");
})
.catch(err=>{
    res.send("unable to delete");
})
res.send(user);
});

employeeRouter.get("/:id",async(req,res)=>{
    let user=await Employee.findOne({_id:req.params.id});
    res.send(user);
    });
    
    employeeRouter.put("/:id",async(req,res)=>{
        let user=await Employee.updateOne({_id:req.params.id},{$set:req.body});
        res.send(user);
        });
module.exports = employeeRouter;