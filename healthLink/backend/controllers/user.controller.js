
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../db');
const crypto = require('crypto');
require('dotenv').config();




// Function to generate a random string
const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Function to generate a unique user ID using timestamp and random string
const generateUserId = () => {
    const timestamp = Date.now().toString();
    const randomString = generateRandomString(8); // Adjust the length as needed
    const combinedString = `${timestamp}${randomString}`;

    const hash = crypto.createHash('sha256');
    hash.update(combinedString);
    return hash.digest('hex');
};




function signUp(req, res) {
    //Sign up

    const { name, email, phoneNumber, dateOfBirth, password, address } = req.body;

    dbPool.query('SELECT id FROM user WHERE email = ?', [email], (error, results) => {

        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            if (results.length > 0) {
                return res.status(250).json({ message: 'Email alrady exist' });
            }

            const userId = generateUserId();

            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, function (err, hash) {

                    const sql = "INSERT INTO `user` (`id`, `name`, `email`, `phone`, `address`, `birth_date`, `role`, `password`) " +
                        "VALUES (?,?,?,?,?,?,?,?)";


                    dbPool.query(sql, [userId, name, email, phoneNumber, address, dateOfBirth, "user", hash], (error, results) => {
                        if (error) {
                            // console.error(error);
                            return res.status(250).json({ message: 'Error creating', error: error });
                        } else {
                            res.status(201).json({ message: 'User created successfully' });
                        }
                    });

                });
            });
        }
    });

}











function login(req, res) {

    const { email, password } = req.body;

    try {
        dbPool.query('SELECT password,id,email,role,phone FROM user WHERE email = ?', [email], (error, results) => {
            // return res.status(200).json({ results: results });
            if (error) {
                return res.status(250).json({ message: 'Error', error: error });
            } else {
                if (results.length > 0) {
                    return bcryptjs.compare(password, results[0].password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({
                                email: results[0].email,
                                userId: results[0].id,
                                role: results[0].role
                            }, process.env.JWT_KEY, function (err, token) {
                                return res.status(200).json({
                                    message: "Authentication successful!",
                                    token: token,
                                    userId: results[0].id,
                                    role:results[0].role,
                                    phone:results[0].phone
                                });
                            });
                        } else {
                            return res.status(250).json({
                                message: "Invalid credentials!",
                            });
                        }
                    });
                } else {
                    return res.status(250).json({ message: "Email not Found!" });
                }



            }
        });

    } catch (err) {
        return res.status(250).json({ error: 'An error occurred during login' });
    }


}






function adminLogin(req, res) {
    const { email, password } = req.body;


    try {
        dbPool.query('SELECT password,id,email,role FROM admin WHERE email = ?', [email], (error, results) => {
            // return res.status(200).json({ results: results });
            if (error) {
                return res.status(250).json({ message: 'Error', error: error });
            } else {
                if (results.length > 0) {
                    if (password === results[0].password) {
                        const token = jwt.sign({
                            email: results[0].email,
                            userId: results[0].id,
                            role: results[0].role
                        }, process.env.JWT_KEY, function (err, token) {
                            return res.status(200).json({
                                message: "Authentication successful!",
                                token: token,
                                role: results[0].role
                            });
                        });
                    }
                    else {
                        return res.status(250).json({
                            message: "Invalid credentials!",
                        });
                    }

                } else {
                    return res.status(250).json({ message: "Invalid credentials!" });
                }
            }
        });

    } catch (err) {
        return res.status(250).json({ error: 'An error occurred during login' });
    }

}





function doctorLogin(req, res) {
    const { email, password } = req.body;

    try {
        dbPool.query('SELECT password,id,email,role FROM doctor WHERE email = ?', [email], (error, results) => {
            // return res.status(200).json({ results: results });
            if (error) {
     
                return res.status(250).json({ message: 'Error'});
            } else {
                if (results.length > 0) {
                    if (password === results[0].password) {
                        const token = jwt.sign({
                            email: results[0].email,
                            userId: results[0].id,
                            role: results[0].role
                        }, process.env.JWT_KEY, function (err, token) {
                            return res.status(200).json({
                                message: "Authentication successful!",
                                token: token,
                                role: results[0].role,
                                doctor_id: results[0].id
                            });
                        });
                    }
                    else {
                        return res.status(250).json({
                            message: "Invalid credentials!",
                        });
                    }

                } else {
                    return res.status(250).json({ message: "Invalid credentials!" });
                }
            }
        });

    } catch (err) {
        return res.status(250).json({ error: 'An error occurred during login' });
    }

}





module.exports = {
    signUp: signUp,
    login: login,
    adminLogin: adminLogin,
    doctorLogin:doctorLogin,
} 