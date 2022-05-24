// jshint esversion : 12

const express = require('express');
const bodyParser = require('body-parser');
const ejs =require('ejs');
const { circular, linear } = require('./function');
const func =require(__dirname+'/function.js');

// const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/',(req,res)=>{
    const typeP = req.body.typeF;
    if(typeP==="Circular"){
        res.redirect('/Circular')
    }else if(typeP==="Linear"){
        res.redirect('/Linear');
    }else if(typeP==="Point"){
        res.redirect('/Point');
    }
    else{
        res.redirect('/');
    }
})

app.get('/Circular',(req,res)=>{
    res.render('Circular');
})
app.get('/Linear',(req,res)=>{
    res.render('Linear');
})
app.get('/Point',(req,res)=>{
    res.render('Point');
})

app.post('/Circular',(req,res)=>{
    const R = parseFloat(req.body.Rad);
    const z = parseFloat(req.body.CorZ);
    const Q = parseFloat(req.body.loadI);
    var Stress = func.circular(R,z,Q) ;
    res.render('result',{ typeL : "Circular", loadI:(Q.toString())+" N/m^2" ,stress : Stress});
})
app.post('/Linear',(req,res)=>{
    const l = parseFloat(req.body.lineL);
    const x = parseFloat(req.body.CorX) ;
    const z = parseFloat(req.body.CorZ);
    const Q = parseFloat(req.body.loadI);
    var Stress = func.linear(x,z,Q);
    res.render('result',{stress : Stress, loadI:(Q.toString())+" N/m" , typeL : "Linear"});
})
app.post('/Point',(req,res)=>{
    const x = parseFloat(req.body.CorX);
    const y = parseFloat(req.body.CorY);
    const z = parseFloat(req.body.CorZ);
    const Q = parseFloat(req.body.loadI);
    

    var Stress = func.point(x,y,z,Q);

    res.render('result',{ typeL:"Point", loadI:(Q.toString())+" N" , stress : Stress});
})

app.listen(process.env.PORT || 2000 ,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Running at Port : 2000");
    }
})