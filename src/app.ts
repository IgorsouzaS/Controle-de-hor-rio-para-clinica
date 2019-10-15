import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { Routes } from "../src/routes/ruleRoute";


class App{

    public app: express.Application;
    public routePrv: Routes = new Routes();
    private morgan: morgan.Morgan;
    private bodyparser;


    constructor(){
        this.app = express();
        this.middleware();
        this.routePrv.routes(this.app);
    }

    private middleware(){
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true}));
        this.app.use(express.static('public'));
    }

}
export default new App().app;
