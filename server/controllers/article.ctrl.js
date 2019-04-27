const User =require('../models/user')
const Article =require('../models/article')
const cloudinary=require('cloudinary')

module.exports={
    addArticle:(req,res,next)=>{
        let {title,description,text,author}=req.body
        var post = new Article({
            title: title,
            description:description,
            text:text,
            claps:0,
            author: author,
            comments: []
        })
        saveArticle(post)
    
        function saveArticle(post){
            new Article(post).save().then((err,article)=>{
                if(err)res.send(err)
                else if(!article)res.sendStatus(400)
                else{
                    return article.addAuthor(post.author).then((_article)=>{
                        return res.json({msg:post.author})
                    })
                    
                }
                next()
            })
        }
    },
    getAll:(req,res,next)=>{
        Article.find(req.params.id)
        .populate('author')
        .populate('comments.author')
        .exec((err,article)=>{
            if(err)res.send(err)
            else if(!article)
            res.sendStatus(404)
            else res.send(article)
            next()
        })
    },
    clapArticle:(req,res,next)=>{
        Article.findById(req.body.id).then((article)=>{
            return article.clap().then(()=>{
                return res.json({msg:'Done'})
            })
        }).catch(next)
    },
    updateArticle:(req,res,next)=>{
        Article.findById(req.params.id).then((article,err)=>{
            if(err){
                console.log(err)
                res.sendStatus(500)
            }
            else if(!article){
                res.sendStatus(404)
            }
            else{
                if(req.body.title)article.title=req.body.title
                if(req.body.description)article.description=req.body.description
                if(req.body.text)article.text=req.body.text
                article.save((err,updatedArticle)=>{
                    if(err)
                    {
                        console.log(err)
                        res.sendStatus(500)
                    }
                    else res.send(updatedArticle)
                })
            }
        })
    },
    commentArticle:(req,res,next)=>{
        Article.findById(req.body.id).then((article)=>{
            return article.comment({
                author:req.body.author_id,
                text:req.body.comment
            }).then(()=>{
                return res.json({msg:'Done'})
            })
        }).catch(next)
    },
    getArticle:(req,res,next)=>{
        Article.findById(req.body.id)
        .populate('author')
        .populate('comments.author').exec((err,article)=>{
            if (err)
                res.send(err)
            else if (!article)
                res.sendStatus(404)
            else
                res.send(article)
            next()   
        })
    }

}