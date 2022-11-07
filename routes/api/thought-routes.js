const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThoughts)
;

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)

;

router
.route('/:userId')
.post(createThought)
;

router
.route('/:userId/:thoughtId')
.delete(deleteThought)
;




module.exports = router;