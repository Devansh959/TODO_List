const express= require('express');
const path=require('path');
const port= 8000;
const app= express();
const db= require('./config/mongoose');
const bodyParser= require('body-parser')
const Task= require("./models/task");
const { start } = require('repl');
app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    Task.find({},function(err,tasks){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
        console.log(tasks);
        return res.render('todo',
        {
        task_list: tasks
        });

    })
    
})
app.get('/delete-Contact/',function(req,res){
    let id= req.query.id;
    console.log(typeof(id));
    Task.findByIdAndDelete(id,function(err){
        if(err){
            console.log(err);
            
        }
        return res.redirect('back');
    });
    

})



app.post('/create-task',function(req,res){
    Task.create({
        description:req.body.description,
        category: req.body.category,
        date:req.body.date
    },function(err,newTask){
        if(err){
            console.log("error in creating a task")
            return;
        }
        console.log("******",newTask);
        return res.redirect('back')
    });
});

app.listen(port, function(err){
    if(err){
        console.log("Error in connecting to server");
    
    }
    console.log("Successfully connect to port:",port);
})