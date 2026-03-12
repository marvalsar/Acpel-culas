const {Router} = require('express');
const {getMedias, createMedia} = require('../controllers/mediaController');

const router = Router();

router.get('/', getMedias);

router.post('/', createMedia);

module.exports = router;