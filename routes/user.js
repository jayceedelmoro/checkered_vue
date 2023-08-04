const router = require('express').Router();
const admin = require("firebase-admin");
const bcrypt = require('bcrypt');

const db = admin.firestore();

let usersRef = db.collection('users');
let tasksRef = db.collection('tasks');

// GET REQUESTS

// show all users
// api/v1/users
router.get('/', (request, response) => {

    let userList = [];

    usersRef.get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
            userList.push({ id: doc.id, data: doc.data() });
        });
        response.send({ userList });
    });

});

// show details of a user
// api/v1/users/:userId
router.get('/:userId', (request, response) => {
    usersRef.doc(request.params.userId).get().then(doc => {
        if (doc.exists) {
            response.send({ user: doc.data() });
        }
        else {
            response.status( 404 ).send({ message: 'User does not exist' });
        }
    });
});

// show all tasks of a user
// api/v1/users/:userId/tasks
router.get('/:userId/tasks', (request, response) => {
    usersRef.doc(request.params.userId).get().then(doc => {
        if (doc.exists) {
            const list = doc.data().tasks;

            let tasksList = [];

                tasksRef.where(admin.firestore.FieldPath.documentId(),'in', list).get().then(querySnapShot => {
                    querySnapShot.forEach(doc => {
                        tasksList.push({ id: doc.id, data: doc.data() });
                    });
                response.send({ tasksList });
                });

        }
        else {
            response.status( 404 ).send({ message: 'User does not exist' });
        }
    });
});

// POST REQUESTS

// create new user
// api/v1/users
router.post('/register', (request, response) => {
    const {
        username,
        email,
        password
    } = request.body;

    if (username && email && password) {

        usersRef.where('username', '==', username).get().then(returnUsername => {
            const isUsernameValid = returnUsername.empty;

            usersRef.where('email', '==', email).get().then(returnEmail => {
                const isEmailValid = returnEmail.empty;
    
                if (isUsernameValid && isEmailValid) {
                    bcrypt.hash( password, 10 ).then((hash, err) => {
                        usersRef.add({
                            username,
                            email,
                            password: hash,
                            tasks: []
                        })
                        .then(dbResponse => {
                            response.status( 201 ).send({ message: 'User Created' });
                        });
                    });
                }
    
                else {
                    response.status( 400 ).send({ message: 'Username/Email already taken' });
                }
            });
        });
    }

    else {
        response.status( 400 ).send({ message: 'Missing required fields' })
    }
});


// login user
// api/v1/users/login
router.post('/login', (request, response) => {
    usersRef.where('username', '==', request.body.username).get().then(querySnapShot => {
        if( querySnapShot.empty ) {
            return response.status( 404 ).send({ message: 'Please enter correct username or password!' });
        }

        querySnapShot.forEach(doc => {
            bcrypt.compare( request.body.password, doc.data().password ).then( isValid => {
                if( !isValid ){
                    response.status( 400 ).send({ message: 'Please enter correct username or password!' });
                }
                
                else {
                    response.status( 200 ).send({ message: 'Login Successful', userDetails: doc.data() });
                };
            });
        });
        
    });
})

// PUT REQUESTS

// update a user's details
// api/v1/users/:userId
router.put('/:userId', (request, response) => {
    const {
        username,
        email
    } = request.body;

    let query = {};

    const addField = (fieldName, fieldValue) => {
        if (fieldValue) {
            query[fieldName] = fieldValue;
        }
    }

    addField('username', username);
    addField('email', email);

    usersRef.doc(request.params.userId).update(query)
    .then(doc => {
        response.send({ message: 'Successfully Updated' });
    })
    .catch(error => {
        response.status( 404 ).send({ message: 'User was not found' });
    });
});
    
// update a user's password
// api/v1/users/:userId/password
router.put('/:userId/password', (request, response) => {
        bcrypt.hash( request.body.password, 10 ).then((hash, err) => {
            usersRef.doc(request.params.userId).update({
                password: hash
            })
            .then(doc => {
                response.send({ message: 'Password Successfully Changed' });
            })
            .catch(error => {
                response.status( 404 ).send({ message: 'User was not found' });
            })
        })
});

// DELETE REQUESTS

// delete a user
// api/v1/users/:userId
router.delete('/:userId', (request, response) => {
    usersRef.doc(request.params.userId).delete().then(dbResponse => {
        response.status( 201 ).send({ message: 'Successfully Deleted' })
    });
});
    
module.exports = router;