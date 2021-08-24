"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('Hello World!');
});
router.use('/user', require('./user'));
module.exports = router;
