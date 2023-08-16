const router = require('express').Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { updateProfileValidation } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', updateProfileValidation, updateUser);

module.exports = router;
