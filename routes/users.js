const router = require('express').Router();
const User = require('../models/user.model')

router.route('*').get((req, res) => {
    User.find().then(result => {
        res.render('index', {
            users: result
        })
    })
    // User.find()
    //     .then(users => res.json(users))
    //     .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const phone = req.body.phone
    const email = req.body.email

    var msg = []

    if(email.length <=0 && phone.length <= 0){
        var newMsg = {
            data: "You should fill either email or phone",
            type: "danger"
        }
        res.json(newMsg)
    } 
    
    if (name.length <= 3) {
        var newMsg = {
            data: "Name length should be more than 3 chars",
            type: "danger"
        }
        res.json(newMsg)
    } 
    
    if (phone.length < 5) {
        var newMsg = {
            data: "Phone number should be more than 5",
            type: "danger"
        }
        res.json(newMsg)
    }

    const newUser = new User({ name, phone, email })

    newUser.save()
        .then(() => res.json({
            data: 'You Signed Up Successfuly!',
            type: "success"
        }))
        .catch(err => {
            res.json({
                data: "Try Again later",
                type: "danger"
            })
        })
})

module.exports = router