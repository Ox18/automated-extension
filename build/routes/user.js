"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
var router = express_1.default.Router();
router.post('/createAll', UserController_1.default.createUsers);
router.post('/deleteAll', UserController_1.default.deleteAll);
router.post('/activeUser/:id', UserController_1.default.activeUser);
router.get('/get', UserController_1.default.getUser);
router.get('/getCount', UserController_1.default.getCount);
module.exports = router;
