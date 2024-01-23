const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const port = 3000
const app = express()

app.use(bodyParser.urlencoded({extended:false}))


app.get('/',(req,res) => {

    fs.readFile('chat.txt',(err,data) => {
        if(err){console.log(err)}
        
        res.send(`${data}<form action="/" method= "POST" onSubmit= "document.getElementById('username').value = localStorage.getItem('username')"><input type="text" name="message" id="message"></input><input type="hidden" name="username" id="username"></input><button type="submit">Send</button></form>`)
    
        
    })
})
app.post('/',(req,res) => {

    // console.log(req.body.username)
    // console.log(req.body.message)
    fs.writeFile("chat.txt" ,`${req.body.username}: =>${req.body.message}`,{flag:'a'}, (err) => {
        if(err){console.log(err)}
        res.redirect('/')
    })
    
})

app.get('/login',(req,res) => {

    res.send(`<form action="/" method="GET" onSubmit="localStorage.setItem('username',document.getElementById('username').value)"><input type="text" name="username" placeholder="username" id="username"></input><button type="submit">Login</button></form>`) 
})



app.listen(port,(err) => {
    if(err){console.log("SERVER IS NOT RUNNING",err)}
    console.log("SERVER IS RUNNING ON PORT:",port)
})