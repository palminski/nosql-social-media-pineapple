const router = require('express').Router();
userRoutes = require('./user-routes.js');

router.use('/users',userRoutes);

module.exports = router;