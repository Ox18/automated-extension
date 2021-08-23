import { Request, Response, NextFunction } from 'express';
import Connection from '../Model/connection';

class UserController{
    static async create(req: Request, res: Response, next: NextFunction){
        const db = Connection.getDB();
        const sql = 'insert into user(name, lastname,gender, phone, dni, correo) values(?,?,?,?,?,?)';

        const { body } = req;
        const { Output } = body;

        Output.map(function(user:any){
            const { Nombre, Apellido, Celular, DNI } = user;
            const gender = user['Género'];
            const correo = user['Correo electrónico'];
            const params:any[] = [Nombre, Apellido, gender, Celular, DNI, correo];
            db.run(sql, params, function(err:any){
                if(err){

                    return console.log(err.message);
                }
                console.log(`A row has been inserted with rowid ${this.lastID}`);
            });
        })
        res.json(Output);

    }
}

export = UserController;