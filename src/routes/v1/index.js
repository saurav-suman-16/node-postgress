const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('Api V1');
});

module.exports = router;
