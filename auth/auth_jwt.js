const db = require('../pool_connection/connect');
const router = require('express').Router();
const { validateLogin, generateAccessToken, verify, validateRegister } = require('./utilities'); 
const { comparePasswords, hashPassword } = require('./hash');

router.post('/login', validateLogin, (req, res) => {
    const { email, password } = req.user;

    db.query(
        `SELECT u.user_id, u.last_name, u.first_name, u.email, u.password, ut.type_name
        FROM users AS u
        JOIN user_types AS ut
        ON u.user_type_id = ut.user_type_id
        WHERE u.email = '${email}'`, (err, user) => {
            if (err) {
                res.status(404).json({defaultErr: 'User not found'});
            } else {
                const data = user.rows[0];
                if (data) {
                    comparePasswords(password, data.password)
                    .then(results => {
                        if (results) {
                            const accessToken = generateAccessToken(data);

                            ///// ADD MORE OPTIONS /////
                            res.cookie('token', accessToken, {
                                httpOnly: true,
                                origin: 'http://localhost:3000'
                            }); 

                            res.status(200).json({ role: data.type_name, id: data.user_id });
                        } else {
                            res.status(403).json({defaultErr: 'Username and password do not match'});
                        }
                    }).catch(err => {
                        res.status(403).json({defaultErr: 'Username and password do not match'});
                    });
                } else {
                    res.status(404).json({defaultErr: 'User not found'});
                }
            }
        })
});

router.post('/register', validateRegister, (req, res) => {
    const { lastName, firstName, email, password, newRole } = req.user;

    db.query(
        `SELECT u.user_id, u.last_name, u.first_name, u.email, u.password, ut.type_name
        FROM users AS u
        JOIN user_types AS ut
        ON u.user_type_id = ut.user_type_id
        WHERE u.email = '${email}'`, (err, user) => {
            if (err) {
                res.status(404).json(`Something unexpected happened; ${err}`);
            } else {
                const data = user.rows[0];
                if (data) {
                    if (lastName === data.last_name && firstName === data.first_name && newRole === data.type_name) {
                        comparePasswords(password, data.password)
                        .then(results => {
                            if (results) {
                                const accessToken = generateAccessToken(data);

                                ///// ADD MORE OPTIONS /////
                                res.cookie('token', accessToken, {
                                    httpOnly: true,
                                    origin: 'http://localhost:3000'
                                }); 

                                res.status(200).json({
                                    username: data.last_name + ' ' + data.first_name,
                                    type: data.type_name,
                                    accessToken
                                });
                            } else {
                                res.status(403).json({defaultErr: 'Something unexpected happened'});
                            }
                        }).catch(err => {
                            res.status(401).json('Email address already exists');
                        });
                    } else {
                        res.status(401).json('Email address already exists');
                    }
                } else {
                    hashPassword(password)
                    .then(result => {
                        let roleInteger;
                        switch (newRole) {
                            case 'professor':
                                roleInteger = 1;
                                break;
                            case 'student':
                                roleInteger = 2;
                                break;
                            case 'individual':
                                roleInteger = 3;
                                break;
                            default:
                                roleInteger = 3;
                        };

                        db.query(`
                            INSERT INTO users (user_type_id, last_name, first_name, password, email)
                            VALUES (${roleInteger}, '${lastName}', '${firstName}', '${result}', '${email}')
                        `, (err, user) => {
                            if (err) {
                                res.status(500).json('Could not create user');
                            } else {
                                const accessToken = generateAccessToken(user);

                                ///// ADD MORE OPTIONS /////
                                res.cookie('token', accessToken, {
                                    httpOnly: true,
                                    origin: 'http://localhost:3000'
                                }); 

                                res.status(200).json({
                                    username: lastName + ' ' + firstName,
                                    type: newRole,
                                    accessToken
                                });
                            }
                        });
                    }).catch(err => {
                        res.status(500).json('Could not create user');
                    })
                }
            }
        });
});

router.get('/logout', verify, (req, res) => {
    res.clearCookie('token');
    console.log(req.cookies);
    res.end();
});

module.exports = router;