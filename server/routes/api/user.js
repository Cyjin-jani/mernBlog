import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//jwt token인증관련
import config from '../../config/index';
const { JWT_SECRET } = config;

//model
import User from '../../models/user'

const router = express.Router()

//유저정보 가져오기
// @routes      GET api/user
// @desc        Get all user
// @access      public
router.get('/', async(req, res) => {
    try{
        const users = await User.find()
        if(!users) {
            throw Error("No users")
        }else {
            res.status(200).json(users)
        }
    }catch(e) {
        console.log(e);
        res.status(400).json({msg: e.message})
    }
});

//회원가입
// @routes      POST api/user
// @desc        Register user
// @access      public
router.post('/', (req, res) => {
    console.log(req);
    const {name, email, password} = req.body;

    //Simple Validation
    if(!name || !email || !password) {
        return res.status(400).json({msg: "모든 정보를 입력해주세요."})
    }

    //Check for existing user
    User.findOne({email})
        .then((user) => {
            if(user) return res.status(400).json({msg: "이미 가입된 유저가 존재합니다."})
            const newUser = new User({
                name, email, password
            })
            //비번 암호화
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user) => {
                        jwt.sign(
                            {id: user.id},
                            JWT_SECRET,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        name: user.name,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
                })
            })
        })

})


export default router;