const router = require('express').Router();
const passport = require('passport');

const Tag = require('../../models/Tag');

// Routes for /api/tags

// Type		GET
// URL		/api/tags
// Desc		Returns list of all tags
router.get('/', (req, res) => {
	Tag.find({})
		.populate('addedBy', ['name'])
		.then(tags => {
			res.json({ tags });
		})
		.catch(err => {
			res.json({ error: 'Unable to get tags' });
		});
});

// Type		POST
// URL		/api/tags
// Desc		Adds a new tag to the database
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const tag = new Tag({
		tag: req.body.tag,
		description: req.body.description,
		website: req.body.website
	});

	tag.save()
		.then(tag => {
			res.json({ tag });
		})
		.catch(err => {
			if (err.code === 11000) res.json({ error: 'Tag already exist' });
			else res.json({ err });
		});
});

module.exports = router;
