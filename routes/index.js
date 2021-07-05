const {Router} = require('express')

const router = Router()

router.use('/clients', require('./clients.route'))

module.exports = router