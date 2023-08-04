const router = require('express').Router();
const admin = require("firebase-admin");

const db = admin.firestore();

let usersRef = db.collection('users');
let tasksRef = db.collection('tasks');

// GET REQUESTS

// show all tasks
// api/v1/tasks
router.get('/', (request, response) => {

    let taskList = [];

    tasksRef.get().then(querySnapShot => {
        querySnapShot.forEach(doc => {
            taskList.push({ id: doc.id, data: doc.data() });
        });
        response.send({ taskList });
    })

});

// show details of specific task
// api/v1/tasks/:taskId
router.get('/:taskId', (request, response) => {
    tasksRef.doc(request.params.taskId).get().then(doc => {
        if (doc.exists) {
            response.send({ task: doc.data() });
        }
        else {
            response.status( 404 ).send({ message: 'Task does not exist' });
        }
    })
});

// POST REQUESTS

// create new tasks
// api/v1/tasks
router.post('/', (request, response) => {
    const {
        name,
        description,
        ownerId
    } = request.body;

    if (name && description) {
        tasksRef.add({
            name,
            description,
            ownerId,
            status: false
        })
        .then(dbResponse => {
            usersRef.doc(ownerId).update({
                tasks: admin.firestore.FieldValue.arrayUnion(dbResponse.id)
            }).then(() =>{
                response.status( 201 ).send({ message: 'Successfully Created' });
            });
        });
    }

    else {
        response.status( 400 ).send({ message: 'Missing required fields' })
    }
});

// PUT REQUESTS

// edit a task details
// api/v1/tasks/:taskId
router.put('/:taskId', (request, response) => {
    const {
        name,
        description,
        status
    } = request.body;

    let query = {};

    const addField = (fieldName, fieldValue) => {
        if (fieldValue) {
            query[fieldName] = fieldValue;
        }
    }

    addField('name', name);
    addField('description', description);
    addField('status', status);

    tasksRef.doc(request.params.taskId).update({query})
    .then(doc => {
        response.send({ message: 'Successfully Updated' });
    })
    .catch(error => {
        response.status( 404 ).send({ message: 'Task was not found' });
    })
});

// DELETE REQUESTS

// delete a task
// api/v1/tasks/:taskId
router.delete('/:taskId', (request, response) => {
    tasksRef.doc(request.params.taskId).delete().then(dbResponse => {
        usersRef.doc(request.body.ownerId).update({
            tasks: admin.firestore.FieldValue.arrayRemove(request.params.taskId)
        }).then(() =>{
            response.status( 201 ).send({ message: 'Successfully Deleted' })
        });
    });
});
    
module.exports = router;