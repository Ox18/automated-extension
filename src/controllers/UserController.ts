import { Request, Response, NextFunction } from 'express';
import Connection from '../Model/connection';

class UserController{
    static async createUsers(req: Request, res: Response){
        const db = Connection.getDB();
        const sql = 'insert into user(name, lastname,gender, phone, dni, correo) values(?,?,?,?,?,?)';

        const { body } = req;

        if(body.hasOwnProperty('Output')){
            // const Output = body.Output.Output;
            let registerCount = 0;

            // Output.map(function(user:any){
            //     const { Nombre, Apellido, Celular, DNI } = user;
            //     const gender = user['Género'];
            //     const correo = user['Correo electrónico'];
            //     const params:any[] = [Nombre, Apellido, gender, Celular, DNI, correo];
            //     db.run(sql, params, function(err:any){
            //         if(err) return console.log(err.message);
            //         registerCount++;
            //         console.log(`A row has been inserted with rowid ${this.lastID}`);
            //     });
            // })
            res.json({
                // message: (registerCount === Output.length) ? 'Todos los registros fueron subidos.' : 'No se enviaron: ' + registerCount + ' registros.',
                error: false,
                success: true
            })
        }else{
            res.json({
                message: 'Los datos enviados no son correctos.',
                error: true,
                success: false,
            });
        }
    }

    static async deleteAll(req: Request, res: Response){
        const db = Connection.getDB();
        const sql = "DELETE FROM user";
        let message = "Success";
        let error = false;
        let success = true;
        db.run(sql, [], function(err){
            if(err){
                error = true;
                success = false;   
                message = err.message;
            }
        });
        res.json({
            error,
            message,
            success
        })
    }

    static async activeUser(req: Request, res: Response){
        res.send('eliminar usuario en especifico');
    }

    static async getUser(req: Request, res: Response){
        res.send('obtener un usuario al random');
    }
    
    static async getCount(req: Request, res: Response){
        res.send('obtener cantidades de numeros');
    }

}

export = UserController;