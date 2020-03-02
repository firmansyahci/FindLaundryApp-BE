const userModel = require('../models/user')
const miscHelper = require('../helpers/helpers')
const { genSaltSync, compareSync, hashSync } = require('bcrypt-nodejs')
const { sign } = require('jsonwebtoken')

module.exports = {
    getUser: (req, res) => {
        userModel.getUsers().then(result => {
            miscHelper.response(res, result, 200, '')
        })
            .catch(err => console.log(err))
    },
    register: (req, res) => {
        const { email, password, username, address, phone } = req.body
        const data = {
            email,
            password,
            username,
            address,
            phone,
            role: 1,
        }
        const salt = genSaltSync(10)
        data.password = hashSync(data.password, salt)
        userModel.register(data).then(result => {
            const data = {
                id: result.insertId,
                email,
                password,
                username,
                address,
                phone,
                role: 1,
            }
            miscHelper.response(res, data, 200)
        })
            .catch(err => {
                miscHelper.response(res, {}, 201, err)
                console.log(err)
            })
    },
    login: (req, res) => {
        const { email, password } = req.body
        const data = {
            email,
            password
        }
        userModel.login(data.email).then(result => {
            const data = {
                email,
                password
            }
            const results = compareSync(data.password, result.password)
            const id = result.id
            if (results) {
                result.password = undefined
                const jwt = sign({ id: result.id, role: result.role }, process.env.PRIVATE_KEY, { expiresIn: '3h' })
                return res.json({
                    success: 1,
                    message: 'Login Successfully',
                    token: jwt
                })
            } else {
                return res.json({
                    success: 0,
                    message: 'Invalid Password!!'
                })
            }
        })
            .catch(err => {
                return res.json({
                    success: 0, 
                    message: 'Invalid email, Please Register First!!!'
                })
                
            })
    }
}