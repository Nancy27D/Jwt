const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSkey = "bella"
exports.signup = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        let existingUser = await User.findOne({ email: email })
        if (existingUser) { res.json({ message: "This user is already present! Login instead" }) }
        else {
            //if your key:value is same so defiend as same 
            const hashedPassword = bcrypt.hashSync(password)
            const adduser = new User({ name, email, password: hashedPassword })
            //saving doc in db
            await adduser.save()
            return res.status(201).json({ userData: adduser, message: "Signup Succssfully" })
        }

    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let existingUser = await User.findOne({ email: email })
        console.log(existingUser, "existinUser")
        if (!existingUser) { return res.json({ message: "User not found! Signup please" }) }

        let isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
        console.log(isPasswordCorrect, "isPasswordCorrect")
        if (!isPasswordCorrect) { return res.json({ message: "Invalid Password/Email" }) }
        console.log(jwtSkey, "keyyy                         39")
        //encoded info like id of user
        const token = jwt.sign({ id: existingUser._id }, jwtSkey, { expiresIn: "35s" })
        //To send token securly to frontend using cookie
        res.cookie(String(existingUser._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        })
        return res.json({ message: "Succesfully Logged In", user: existingUser, token: token })
    } catch (error) {
        return new Error(error)
    }
}

exports.verfiyToken = (req, res, next) => {
    //get token on backend using authorization header
    // const headers = req.headers[`authorization`]
    // const token = headers.split(" ")[1];
    //get token on backend using cookie header
    const cookies = req.headers.cookie;
    console.log(cookies, "cooooooooooooooooooooooooooooooooooooooooooooo")
    //splits the sring into arrays (remove id from token)
    const token = cookies.split("=")[1];
    console.log(token, "from frontedn")
    if (!token) {
        res.json({ message: "No token found" })
    }
    // Arry into string then Verfiy token if verifyed , decoded info will be in user
    jwt.verify(String(token), jwtSkey, (err, user) => {
        if (err) {
            return res.json({ message: "Invalied token" })
        }
        console.log(user.id, "user decoded id info")
        req.id = user.id
    })
    next()//Pass id 
}

exports.getUser = async (req, res, next) => {
    // reciving id as parameters
    const userID = req.id;
    let user;
    try {
        user = await User.findById(userID, "-password")
        if (!user) {
            return res.json({ message: "User not Found" })
        }
        return res.json({ user })
    } catch (error) {
        return new Error(error)
    }
}

exports.refreshToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const PrevToken = cookies.split("=")[1];
    if (!PrevToken) {
        return res.status(400).json({ message: "Couldn't find token!" })
    }
    //verfiy Prev token
    jwt.verify(String(PrevToken), jwtSkey, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json({ message: "Authentication Failed" })
        }
        //if there is any user so we need to clear cookie.
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""
        //genrate new token 
        const newToken = jwt.sign({ id: user.id }, jwtSkey, { expiresIn: "35s" })
        //To send token securly to frontend using cookie
        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        })
        req.id = user.id;
        next()

    })
}


