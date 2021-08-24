import Connection from './connection';

class UserModel {

    static CreateUsers(users: any[]){
        return new Promise((resolve)=>{
            const db = Connection.getDB();
            const listUser = users.map(function(user: any){
                const { Nombre, Apellido, Celular, DNI } = user;
                const gender = user['Género'];
                const correo = user['Correo electrónico'];
                return [Nombre, Apellido, gender, Celular, DNI, correo];
            });

            let sqlForced = `insert into user (name, lastname, gender, phone, dni, correo)
            values `;
            for(let i = 0; i < listUser.length; i++){
                const user = listUser[i];
                sqlForced += `("${user[0]}", "${user[1]}", "${user[2]}", "${user[3]}", "${user[4]}", "${user[5]}")`;
                if((listUser.length - 1) === i){
                    sqlForced += ";";
                }else{
                    sqlForced += ", ";
                }
            }
            db.run(sqlForced, [], function(err){
                db.close();
                if(err){
                    resolve({
                        error: true,
                        message: err.message
                    })
                }else{
                    resolve({
                        error: false,
                        message: 'success'
                    })
                }
            })
        }); 
    }
    static deleteDuplicates(){
        return new Promise((resolve)=>{
            const db = Connection.getDB();
            const sql = "delete from user where rowid not in (select max(rowid) from user group by phone)";
            db.run(sql, [], function(){
                db.close();
                resolve('ok');
            })
        })
    }

    static getCountData() {
        return new Promise((resolve) => {
            const db = Connection.getDB();
            let result = { countsActive: 0, countNotActive: 0 };
            const sql = "select count(*) as countsActive, (select count(*) from user where featured = 0) as countNotActive from user where featured = 1";
            db.all(sql, [], function (err, rows) {
                db.close();
                if (err) {
                    resolve({ ...result, message: err.message, error: true });
                }
                resolve(rows.length > 0 ? { ...rows[0], message: 'satisfactorio', error: false } : { ...result, error: true, message: 'Campos vacios' });
            });
        });
    }
    static activeUser(id: number){
        return new Promise((resolve)=>{
            const db = Connection.getDB();
            const sql = "UPDATE user SET featured = 1 where id = ?";
            const params = [id];
            db.run(sql, params, function(err){
                db.close();
                if(err){
                    resolve({
                        error: true,
                        message: err.message
                    });
                }
                resolve({
                    error: false,
                    message: 'success'
                })
            });
        })
    }

    static deleteAll(){

        return new Promise( (resolve) => {
            const db = Connection.getDB();
            const sql = "delete from user";
            db.run(sql, [], function(){
                db.close();
                resolve('ok');
            });
        })
    }

    static getUser(){
        return new Promise( (resolve)=>{
            const db = Connection.getDB();
            const sql = "select * from user where featured = 0 limit 1";
            db.get(sql, [], function(err, row){
                db.close();
                if(err){
                    resolve({
                        error: true,
                        message: err.message
                    });
                }
                console.log(row);
                resolve({
                    error: false,
                    message: 'success',
                    data: [{...row}]
                });
            });
        })
    }
}

export = UserModel;