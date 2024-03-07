let express = require("express");
require("./dbconfig"); //not reusing 
let cors = require('cors');
let Student = require("./student"); //iam going to reuse in another
let Employee = require("./employee");
let Client = require("./client");
let Signup = require("./signup");

const studentRouter = require("./router/student");
const employeeRouter = require("./router/employee");
const clientRouter = require("./router/client");

let app = express();

app.use(express.json());
app.use(cors());

app.use("/student/", studentRouter);
app.use("/employee/", employeeRouter);
app.use("/client/", clientRouter);

app.post("/signup",async(req,res)=>{
    let user = new Signup(req.body);
    let result = await user.save();
    res.send(result);
});

app.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    await Signup.findOne({email:email})
    .then((info)=>{
     if(info==null){
         res.send("no user found");
     }
     else if(info.password == password){
         res.send("Valid");
     }
     else{
         res.send("Invalid Password");
     }
    })
  .catch((err)=>{
    res.send("No user Found");
  });
});

app.listen(4000);