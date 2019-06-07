const express = require('express');

const router = express.Router();

const db = require('../data/action-models');
const validateBody = require('../middleware/validateBody');
const validateId = require('../middleware/validateId');
const errorRef = require('../helpers/errorRef');

// GET
router.get('/', async (req, res) => {
  try {
    const actions = await db.get();
    res.json(actions);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

router.get('/:id', validateId(db), async (req, res) => {
  try {
    res.json(req.resource);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// POST
router.post('/', validateBody({
  description: {
    type: 'string',
    required: true,
  },
  project_id: {
    type: 'number',
    required: true,
    exists: {
      database: require('../data/models'),
      table: 'project',
      column: 'id',
    }
  }
}), async (req, res) => {
  try {
    const action = await db.add(req.body);
    res.json(action);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// PUT
router.put('/:id', validateId(db), async (req, res) => {
  try {
    const action = await db.update(req.resource.id, {
      ...req.resource,
      ...req.body,
    });
    res.json(action);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// DELETE
router.delete('/:id', validateId(db), async (req, res) => {
  try {
    const action = await db.remove(req.resource.id);
    res.json(action);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

module.exports = router;
