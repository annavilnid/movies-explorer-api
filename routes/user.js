const router = require('express').Router();

const {
  createUser, getUserInfo, updateUserInfo,
} = require('../controllers/users');

router.post('/me', createUser);

router.get('/me', getUserInfo);

router.patch('/me', updateUserInfo);

module.exports = router;
