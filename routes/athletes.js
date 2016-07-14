var express = require('express');
var router = express.Router();
var redis = require("redis"),
    client = redis.createClient(process.env.redis);

/* GET home page. */
router.get('/:name', function(req, res, next) {
    client.set("name", req.params.name, redis.print);
    res.send("hello world");
});

module.exports = router;