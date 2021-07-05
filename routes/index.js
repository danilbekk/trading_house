const { Router } = require('express');

const router = Router();

router.use('/clients', require('./clients.route'));
router.use('/notes', require('./notes.route'));

module.exports = router;
