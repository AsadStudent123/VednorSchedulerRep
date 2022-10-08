const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const app=express()
const mysql=require('mysql')

const db=mysql.createPool({
    host:"localhost",
    user: "root",
    password: "root",
    database:"vendorsched",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/getVendors',(req,res)=>{
    const dbquery="select customerid as customerid,name as name from vendorsched.customers;";
    db.query(dbquery,(err,result)=>{
        res.send(result);
    });
    
})
app.post('/api/postTime',(req,res)=>{
    const customerid=req.body.customerid;
    const day=req.body.day;
    const startTime=req.body.startTime;
    const endTime=req.body.endTime;
    let inserquery="";
    const datetimenow=new Date();
    if(startTime =='*' && endTime=='*'){
        inserquery ="insert into vendorsched.jobschedule(customerid,day,time,endtime,lastmodifieddatetime) VALUES ?";
        var values = [
            [customerid, 'mon', startTime,endTime,datetimenow],
            [customerid, 'tue', startTime,endTime,datetimenow],
            [customerid, 'wed', startTime,endTime,datetimenow],
            [customerid, 'thrs', startTime,endTime,datetimenow],
            [customerid, 'fri', startTime,endTime,datetimenow],
            [customerid, 'sat', startTime,endTime,datetimenow],
            [customerid, 'sun', startTime,endTime,datetimenow],
        ];
    }
    else{
        inserquery ="insert into vendorsched.jobschedule(customerid,day,time,endtime,lastmodifieddatetime) VALUES ?";
        var values = [
            [customerid, day, startTime,endTime,datetimenow],
        ];
    }
    db.query(inserquery,[values],(err,result)=>{
        res.send(result);
    });
    
})
app.get('/api/getdays',(req,res)=>{
    const dbquery="select daycode as daycode,dayname as dayname from vendorsched.days;";
    db.query(dbquery,(err,result)=>{
        res.send(result);
    });
    
})

app.get('/api/getjobschedule/:customerid/:day',(req,res)=>{
    const customerid=req.params.customerid;
    const day=req.params.day;
    const dbquery="select time as starttime,endtime as endtime from vendorsched.jobschedule where customerid=? and day =? order by lastmodifieddatetime desc ";
    db.query(dbquery,[customerid,day],(err,result)=>{
        res.send(result);
    });
    
})

app.post('/api/postCustomername',(req,res)=>{
    const name=req.body.vname;
    inserquery ="insert into vendorsched.customers(name) VALUES ?";
    var values = [
        [name],
    ];
    db.query(inserquery,[values],(err,result)=>{
        res.send(result);
    });
    
})

app.listen('3001',()=>{
    console.log('Vednor Scheduler');
})