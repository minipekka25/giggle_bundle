const express  = require("express");
const app = express();
const mongoose = require('mongoose');
const http = require("http");
const keys = require('./config/keys');
const cookieSession = require('cookie-session')
const passport = require('passport')
const server = http.createServer(app)
const socketIo = require("socket.io");
const io = socketIo(server); 
const bodyParser = require('body-parser')
const PORT  = process.env.PORT || 5000
require('./services/passport')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Origin', req.header('origin')
        || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    next()
});

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())



app.use(
    cookieSession({
        name: 'slack-session',
        keys: ['fgyuhijf82f3y49hioj', 'dcfvgyhu8r029ergf2hdui'],
        maxAge:30 * 24 * 60 * 60 *1000,
    })
)

app.use(passport.initialize());
app.use(passport.session())

require('./routes/authRoute')(app)
require('./routes/upload')(app)
require('./routes/adminOnBoard')(app)
require('./routes/createChDm')(app)
require('./routes/getInfo')(app)
require('./routes/util')(app)
require('./services/Sockets')(io)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*',(req,res)=>{
        res.setHeader("Content-Type", "text/html");
        res.sendFile(path.resolve(__dirname,'client/build/index.html'))
    })
}


server.listen(PORT,()=>{
    console.log("server running on "+ PORT)
})
