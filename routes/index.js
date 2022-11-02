const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api',apiRoutes);


//Default if adress not found
router.use((req,res) => {
    res.status(404).send('<h1> 404 Not Found </h1>');
});

module.exports = router;