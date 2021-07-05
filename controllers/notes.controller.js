const Note = require('../models/Note.model');

module.exports.notesController = {
  getAll: async (req, res) => {
    try {
      const note = await Note.find();

      return res.json(note);
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },

  createNote: async (req, res) => {
    const { client, status } = req.params;
    const { text } = req.body;
    try {
      const note = await new Note({ text, client, status });

      await note.save();

      return res.json({
        message: 'Запись успешно добавлена',
      });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },

  removeNote: async (req, res) => {
    const { id } = req.params;
    try {
      const note = await Note.findByIdAndRemove(id);

      if (!note) {
        return res.json({
          message: 'Не удалось удалить запись. Укажите верный ID',
        });
      }
      return res.json({
        message: 'Запись успешно удалена',
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },

  editNote: async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
      const note = await Note.findByIdAndUpdate(id, { text }, { new: true });
      return res.json(note);
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
};
