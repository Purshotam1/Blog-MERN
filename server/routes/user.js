const usercontroller=require('../controllers/user.ctrl')

module.exports=(router)=>{
    router.route('/user').get(usercontroller.getUser)
    router.route('/users').get(usercontroller.getAll)
    router.route('/user/profile/:id').get(usercontroller.getUserProfile)

    router.route('/user/signUp').post(usercontroller.addUser)

    router.route('/user/follow').post(usercontroller.followUser)
    router.route('/user/signIn').post(usercontroller.signIn)
}