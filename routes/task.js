const router = require('express').Router();
const admin = require("firebase-admin");

const db = admin.firestore();

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
        description
    } = request.body;

    if (name && description) {
        tasksRef.add({
            name,
            description
        })
        .then(dbResponse => {
            response.status( 201 ).send({ message: 'Successfully Created' })
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
        description
    } = request.body;

    let query = {};

    const addField = (fieldName, fieldValue) => {
        if (fieldValue) {
            query[fieldName] = fieldValue;
        }
    }

    addField('name', name);
    addField('description', description);

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
        response.status( 201 ).send({ message: 'Successfully Deleted' })
    });
});
    
module.exports = router;