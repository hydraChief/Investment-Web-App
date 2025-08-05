function auth(req,res,next){
    console.log('body', req.method);
    if(!req.body) req.body = {};
    req.body.userId = 1;
    next();
}

module.exports = auth;