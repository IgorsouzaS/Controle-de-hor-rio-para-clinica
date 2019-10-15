import {Request, Response, NextFunction} from "express";
import { RuleController } from "../controllers/ruleController2";

export class Routes { 
    
    public ruleController: RuleController = new RuleController() 
    
    public routes(app): void {   
        
        app.route('/').get((req: Request, res: Response) => {            
            res.status(200).json({
                message: 'Select a valid endpoint!'
            }).send().end();
        });
        
        // Listagem de regras 
        app.route('/list').get((req: Request, res: Response, next: NextFunction) => {
            this.ruleController.getRules(req, res);                  
        });
        
        // Listagem de regras com horário disponível
        app.route('/disponibility').get((req: Request, res: Response, next: NextFunction) => {
            this.ruleController.getAvailableTimes(req, res);                  
        });

        //Lista regras disponíveis dentro de uma faixa de tempo
        app.route('/consult/dateinit=:dateinit;timeinit=:timeinit;datefinish=:datefinish;timefinish=:timefinish')
            .get((req : Request, res : Response, next : NextFunction) => {
            this.ruleController.consult(req, res);
        })
        
        //Lista regra específica
        app.route('/list/:id').get((req: Request, res: Response, next: NextFunction) => {
            this.ruleController.getSpecificRule(req, res);                  
        });

        // Criação de regra
        app.route('/add/initialdate=:initialdate;initialtime=:initialtime;finaldate=:finaldate;'+
            'finaltime=:finaltime;type=:type').post((req : Request, res: Response, next: NextFunction) => {
            this.ruleController.addNewRule(req, res);
        });

        // Marca a regra como removida
        app.route('/remove/:id').remove((req : Request, res: Response, next: NextFunction) => {
            this.ruleController.removeRule(req, res);
        });

        // Remove regra pelo seu Id
        app.route('/destroy/:id').remove((req : Request, res: Response, next: NextFunction) => {
            this.ruleController.destroyRule(req, res);
        });

        app.use((req, res, next) => {
            res.status(404).json({ message : "Sorry can't find that!"
            }).send().end();
        });

    }
}