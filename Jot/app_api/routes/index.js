var jwt = require('express-jwt');
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty:'payload'
});

var ctrProfile = require('../controllers/profile');
var ctrAuth = require('../controllers/authentication');

//profile
router.get('/profile', auth, ctrProfile.profileRead);

//authentication
router.post('/register', ctrAuth.register);
router.post('/login', ctrAuth.login);

module.exports = router;
