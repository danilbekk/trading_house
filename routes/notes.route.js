const { Router } = require('express');

const { notesController } = require('../controllers/notes.controller');

const router = Router();

router.get('/', notesController.getAll);
router.post('/:client/:status', notesController.createNote);
router.delete('/:id', notesController.removeNote);
router.patch('/:id', notesController.editNote);

module.exports = router;
