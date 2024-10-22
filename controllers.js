let prisma = require('../config/prisma');

const createItem = async (req, res) => {
  try {
    const { place, location, plan, image, link, date } = req.body;
    const d = new Date(date);
    let formattedDate = d.toISOString();
    const item = await prisma.listItem.create({
      data: {
        place,
        location,
        plan,
        image,
        link,
        date: formattedDate,
      },
    });

    if (!item) {
      res.status(400).json({ msg: 'Error creating item.' });
    }

    res.status(201).json({ item });
  } catch (error) {
    res.status(400).json({ msg: 'Some error has occured.' });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await prisma.listItem.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json({ items });
  } catch (error) {
    res.status(400).json({ msg: 'Some error has occured.' });
  }
};

const updateItem = async (req, res) => {
  try {
    const { place, location, plan, image, link, date } = req.body;
    const d = new Date(date);
    let formattedDate = d.toISOString();
    const { id } = req.params;

    const item = await prisma.listItem.update({
      data: {
        place,
        location,
        plan,
        image,
        link,
        date: formattedDate,
      },

      where: {
        id: id,
      },
    });

    res.status(200).json({ item });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.listItem.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ msg: 'Item deleted' });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { createItem, getItems, updateItem, deleteItem };
