// const express = require('express');
// const router = express.Router();
// const mahasiswaController = require('../controllers/mahasiswaController');
// const cekApiKey = require('../middlewares/cekApiKey');

// router.get('/', mahasiswaController.getAll);
// router.get('/:id', mahasiswaController.getById);
// router.post('/', cekApiKey, mahasiswaController.create);
// router.put('/:id', cekApiKey, mahasiswaController.update);
// router.delete('/:id', cekApiKey, mahasiswaController.remove);

// module.exports = router;

const express = require('express');
const router = express.Router();
const c = require('../controllers/mahasiswaController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', verifyToken, c.create);
router.put('/:id', verifyToken, c.update);
router.delete('/:id', verifyToken, c.remove);

module.exports = router;