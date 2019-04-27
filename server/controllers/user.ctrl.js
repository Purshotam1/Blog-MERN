const User =require('../models/user')
const Article =require('../models/article')
module.exports={
    addUser:(req,res,next)=>{
        new User(req.body).save((err,user)=>{
            if(err)res.send(err)
            else if(!user)res.sendStatus(400)
            else res.send(user)
            next()
        })
    },
    signIn:(req,res,next)=>{
        User.find({email:req.body.email}).exec(function(err,user){
            if(err)res.send(err)
            else if(!user)
            res.sendStatus(404)
            else{
                if(user.length===0)return res.json({flag:false,msg:'wrong email'})
                var item={pass:user[0].pass}
                if(item.pass===req.body.pass)return res.json({user:user,flag:true,msg:'Done'})
                else return res.json({flag:false,msg: 'wrong pass'})
            }
            next()
        })
    }
    ,getAll:(req,res,next)=>{
        User.find().exec((err,user)=>{
            if(err)res.send(err)
            else if(!user)
            res.sendStatus(404)
            else res.send(user)
            next()
        })
    }
    ,getUser:(req,res,next)=>{
        User.findById(req.body.id).then((err,user)=>{
            if(err)res.send(err)
            else if(!user)res.sendStatus(400)
            else res.send(user)
            next()
        })
    },
    followUser:(req,res,next)=>{
        User.findById(req.body.id).then((user)=>{
            return user.follow(req.body.user_id).then(()=>{
                return res.json({msg:'followed'})
            })
        }).catch(next)
    },
    getUserProfile: (req, res, next) => {
        User.findById(req.params.id).then
        ((_user) => {
            return User.find({'following': req.params.id}).then((_users)=>{
                _users.forEach((user_)=>{
                    _user.addFollower(user_._id)
                })
                return Article.find({'author': req.params.id}).then((_articles)=> {
                    return res.json({ user: _user, articles: _articles })
                })
            })
        }).catch((err)=>console.log(err))
    }
}