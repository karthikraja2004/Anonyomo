const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
        min: 6,
        required: true
    },
    name: {
        type: String,
        require: true,
        min: 6
    },

    mobile: {
        type: String,
        required: true,
    },
    collegeName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    posts: {
        type: Array,
        default: []
    }

},
    {
        collection: 'user',
        timestamps: true
    })

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email })

    if (user) {
        const auth = await bcrypt.compare(password, user.password)

        if (auth) {

            return user
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
}
module.exports = mongoose.model('user', userSchema)