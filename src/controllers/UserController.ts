import { Request, Response, NextFunction } from 'express';

import UserModel from '../Model/User';

class UserController{
    static async createUsers(req: Request, res: Response){
        const { body } = req;
        if(body.hasOwnProperty('Output')){
            const { Output } = body;
            const response = await UserModel.CreateUsers(Output);
            await UserModel.deleteDuplicates();
            res.json(response);
        }else{
            res.json({
                error: true,
                message: 'No se envio correctamente el dato'
            })
        }
    }

    static async deleteAll(req: Request, res: Response){
        const response = await UserModel.deleteAll();
        res.json(response);
    }

    static async activeUser(req: Request, res: Response){
        const id = Number(req.params.id);
        const response = await UserModel.activeUser(id);
        res.json(response);
    }

    static async getUser(req: Request, res: Response){
        const response = await UserModel.getUser();
        res.json(response);
    }
    
    static async getCount(req: Request, res: Response){
        const response = await UserModel.getCountData();
        res.json(response);
    }

}

export = UserController;