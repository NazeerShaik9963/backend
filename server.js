require('dotenv').config();
const express = require("express");
const Db = require('./databaseconnection')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json())
app.use(cors())


//get
app.get('/', (request, response) => {
    response.json('hello')
})


//login_page
app.post('/login_page', async(request, response)=>{
    const {email, password} = request.body
    var sqlquery = `SELECT * FROM login_info 
    WHERE email = '${email}';`;
    try {
        const result = await new Promise((resolve, reject)=>{
            Db.query(sqlquery, (error, results)=>{
                if(error){
                    return reject(error)
                }
                else {
                    return resolve(results)
                }
            })
        })
        if(result.length > 0){
            const {email, password_hash} = result[0]
            const isPasswordMatch= await bcrypt.compare(password, password_hash);
            if(isPasswordMatch){
                let payLoad = {
                    email : email
                }
                const  jwtToken = jwt.sign(payLoad, 'MY_TOKEN')
                return response.status(200).json({
                    message: 'Login Successful',
                    data: result,
                    token: jwtToken,
                    status: 200,
                })
            }
            else {
                return response.json({
                    message: 'Password is incorrect'
                    })
                }
        }
        else {
            return response.json({
                message: 'Invalid Email ID'
            })
        }
    } catch (error) {
        return response.status(404).json({
            message: 'Something went wrong',
            error: error
        })
    }
})



//register_page
app.post('/register_page', async(request, response)=>{
    const {email, password, name, phone_number, age, DOB, gender} = request.body;
    const password_hash = await bcrypt.hash(password, 10);
    var sqlquery = `SELECT * FROM login_info 
    WHERE email = '${email}';`;
    try {
        const result = await new Promise((resolve,reject)=>{
            Db.query(sqlquery, (error, results)=>{
                if(error){
                    return reject(error)
                    }
                    else {
                        return resolve(results)
                        }
            })
        })
        
        if(result[0] === undefined){
            let sqlquerynew = `INSERT INTO login_info (email, password_hash, name, phone_number,age,DOB,gender)
            VALUES 
            ('${email}', 
            '${password_hash}', 
            '${name}', 
            '${phone_number}', 
            ${age}, 
            '${DOB}',
            '${gender}')`;
            try {
                let newresult = await new Promise((resolve, reject)=>{
                    Db.query(sqlquerynew, (error, results)=>{
                        if(error){
                            return reject(error)
                        }else {
                            return resolve(results)
                            }
                    })
                })
                return response.status(200).json({
                    message: 'User Registered Successfully',
                    data: newresult,
                    status: 200
                })
            }catch(error){
                return response.status(404).json({
                    message: 'Something went wrong',
                    error: error
                })
            }

        }
        else {
            return response.status(404).json({
                message: 'Email already exists'
            })
        }
    }catch(error){
        return response.status(404).json({
            message: 'Something went wrong',
            error: error
        })
    }
})


app.listen(3001,()=>{
    console.log("server is running on port 3306");
    Db.connect((error)=>{
        if (error) {
            console.error('Error connecting to the database:', error);
            return;
        }
        console.log("Database is connected");
    })
})