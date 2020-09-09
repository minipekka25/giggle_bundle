const passport = require('passport')

module.exports = (app)=>{

 app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}))

app.get("/auth/google/callback",passport.authenticate('google'),(req,res)=>{
    res.redirect('/orgexplorer')
})

app.get('/api/current_user',(req,res)=>{
    res.send(req.user)
})

app.get('/authenticated', async(req,res)=>{
if(req.user){
    res.send('success')
}else{
    res.send('failed')
}
})


app.get('/logout', (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/');
    })

}

