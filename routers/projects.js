const express = require('express');

const router = express.Router();

const db = require('../data/project-models');
const validateBody = require('../middleware/validateBody');
const validateId = require('../middleware/validateId');
const errorRef = require('../helpers/errorRef');

// GET
router.get('/', async (req, res) => {
  try {
    const projects = await db.get();
    res.json(projects);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

router.get('/:id', validateId(db), async (req, res) => {
  try {
    const project = await db.getProject(req.params.id);
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(err));
  }
});

router.get('/:id/actions', validateId(db), async (req, res) => {
  try {
    const actions = await db.getActions(req.params.id);
    res.json(actions);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// POST
router.post('/', validateBody({
  name: {
    type: 'string',
    required: true,
  },
}), async (req, res) => {
  try {
    const project = await db.add(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// PUT
router.put('/:id', validateId(db), async (req, res) => {
  try {
    const project = await db.update(req.resource.id, {
      ...req.resource,
      ...req.body,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

// DELETE
router.delete('/:id', validateId(db), async (req, res) => {
  try {
    const project = await db.remove(req.resource.id);
    res.json(project);
  } catch (error) {
    res.status(500).json(errorRef(error));
  }
});

module.exports = router;
