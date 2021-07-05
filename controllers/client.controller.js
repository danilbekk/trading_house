const Client = require('../models/Client.model');

module.exports.clientsController = {
  createClient: async (req, res) => {
    const { firstname, lastname, patronymic, avatar, room } = req.body;
    try {
      const client = await new Client({
        firstname,
        lastname,
        patronymic,
        avatar,
        room,
      });
      await client.save();
      res.json(client);
    } catch (e) {
      console.log(e.message);
    }
  },

  getAll: async (req, res) => {
    console.log(1);
    try {
      const client = await Client.aggregate([
        {
          $lookup: {
            from: 'notes',
            as: 'notes',
            let: { client: '$_id' },
            pipeline: [{ $match: { $expr: { $eq: ['$client', '$$client'] } } }],
          },
        },
        {
          $lookup: {
            from: 'notes',
            as: 'lastNote',
            let: { client: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$client', '$$client'] } } },
              { $sort: { createdAt: -1 } },
              { $limit: 1 },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            patronymic: 1,
            avatar: 1,
            room: 1,
            notes: 1,
            lastNote: 1,
          },
        },
        { $unwind: { path: '$lastNote', preserveNullAndEmptyArrays: true } },
      ]);

      return res.json(client);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  getClientById: async (req, res) => {
    const { id } = req.params;

    try {
      const client = await Client.findById(id);

      return res.json(client);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  removeClient: async (req, res) => {
    try {
      const { id } = req.params.id;

      const client = await Client.findByIdAndRemove(id);

      if (!client) {
        return res.json({
          message: 'Не удалось удалить клиента. Eкажите верный ID',
        });
      }
      return res.json({
        message: 'Клиент успешно удален',
      });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  },
  editClient: async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, patronymic, avatar, room } = req.body;

    try {
      const client = await Client.findByIdAndUpdate(
        id,
        {
          firstname,
          lastname,
          patronymic,
          avatar,
          room,
        },
        { new: true }
      );
      return res.json(client);
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
};
