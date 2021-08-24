"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var connection_1 = __importDefault(require("./connection"));
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.CreateUsers = function (users) {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var listUser = users.map(function (user) {
                var Nombre = user.Nombre, Apellido = user.Apellido, Celular = user.Celular, DNI = user.DNI;
                var gender = user['Género'];
                var correo = user['Correo electrónico'];
                return [Nombre, Apellido, gender, Celular, DNI, correo];
            });
            var sqlForced = "insert into user (name, lastname, gender, phone, dni, correo)\n            values ";
            for (var i = 0; i < listUser.length; i++) {
                var user = listUser[i];
                sqlForced += "(\"" + user[0] + "\", \"" + user[1] + "\", \"" + user[2] + "\", \"" + user[3] + "\", \"" + user[4] + "\", \"" + user[5] + "\")";
                if ((listUser.length - 1) === i) {
                    sqlForced += ";";
                }
                else {
                    sqlForced += ", ";
                }
            }
            db.run(sqlForced, [], function (err) {
                db.close();
                if (err) {
                    resolve({
                        error: true,
                        message: err.message
                    });
                }
                else {
                    resolve({
                        error: false,
                        message: 'success'
                    });
                }
            });
        });
    };
    UserModel.deleteDuplicates = function () {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var sql = "delete from user where rowid not in (select max(rowid) from user group by phone)";
            db.run(sql, [], function () {
                db.close();
                resolve('ok');
            });
        });
    };
    UserModel.getCountData = function () {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var result = { countsActive: 0, countNotActive: 0 };
            var sql = "select count(*) as countsActive, (select count(*) from user where featured = 0) as countNotActive from user where featured = 1";
            db.all(sql, [], function (err, rows) {
                db.close();
                if (err) {
                    resolve(__assign(__assign({}, result), { message: err.message, error: true }));
                }
                resolve(rows.length > 0 ? __assign(__assign({}, rows[0]), { message: 'satisfactorio', error: false }) : __assign(__assign({}, result), { error: true, message: 'Campos vacios' }));
            });
        });
    };
    UserModel.activeUser = function (id) {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var sql = "UPDATE user SET featured = 1 where id = ?";
            var params = [id];
            db.run(sql, params, function (err) {
                db.close();
                if (err) {
                    resolve({
                        error: true,
                        message: err.message
                    });
                }
                resolve({
                    error: false,
                    message: 'success'
                });
            });
        });
    };
    UserModel.deleteAll = function () {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var sql = "delete from user";
            db.run(sql, [], function () {
                db.close();
                resolve('ok');
            });
        });
    };
    UserModel.getUser = function () {
        return new Promise(function (resolve) {
            var db = connection_1.default.getDB();
            var sql = "select * from user where featured = 0 limit 1";
            db.get(sql, [], function (err, row) {
                db.close();
                if (err) {
                    resolve({
                        error: true,
                        message: err.message
                    });
                }
                console.log(row);
                resolve({
                    error: false,
                    message: 'success',
                    data: [__assign({}, row)]
                });
            });
        });
    };
    return UserModel;
}());
module.exports = UserModel;
