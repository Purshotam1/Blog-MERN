const mongoose=require('mongoose')

let articleSchema=new mongoose.Schema(
    {
        title:String,
        description:String,
        text:String,
        claps:Number,
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        comments:[
            {
                author:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                },
                text:String
            }
        ]
    }
);

articleSchema.methods.clap=function(){
    this.claps++
    return this.save()
}

articleSchema.methods.comment=function(e){
    this.comments.push(e)
    return this.save()
}
articleSchema.methods.addAuthor=function(author_id){
    this.author=author_id
    return this.save()
}
articleSchema.methods.getArticle=function(_id){
    articleSchema.find({'author':_id}).then((article)=>{
        return article
    })
}

module.exports= mongoose.model('Article',articleSchema)

