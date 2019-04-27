const mongoose=require('mongoose')

let userSchema=new mongoose.Schema(
    {
        name:String,
        email:{type:String,required:true,unique:true},
        pass:String,
        followers:[
            {
               
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                
            }
        ],
        following:[
            {
               
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User'
                
            }
        ]
    }
);

userSchema.methods.follow=function(user_id){
    if(this.following.indexOf(user_id)===-1){
        this.following.push(user_id)
    }
    return this.save()
}
userSchema.methods.addFollower=function(fs){
    if(this.followers.indexOf(fs)===-1)
    {
        this.followers.push(fs)
    }
    
    return this.save()
}

module.exports=mongoose.model('User',userSchema)