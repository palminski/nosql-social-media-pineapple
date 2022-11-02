const router = require('express').Router();

const {
    getAllThoughts,
    createThought
} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThoughts)
;

router
.route('/:userId')
.post(createThought)
;




module.exports = router;