import { Request, Response } from 'express';
import {Rule} from '../models/rule'
import * as fs from 'fs';


export class RuleController{


    private rule = new Rule();

    // Adiciona uma nova regra no arquivo data.json
    public addNewRule (req: Request, res: Response) {
        let text = this.readJson();

        if(text == undefined){
            text = new Array;
        }

        const initialDate = req.params.initialdate;
        const finalDate = req.params.finaldate;
        const initialTime = req.params.initialtime;
        const finalTime = req.params.finaltime;
        const type = req.params.type;

        const r1 = text.filter(it => it['dateInit'] = initialDate);
        const r2 = r1.filter(it => it['dateFinish'] = finalDate);
        const r3 = r2.filter(it => it['timeInit'] = initialTime);
        const r4 = r3.filter(it => it['timeInit'] = initialTime);

        const types = ["dia, diariamente, mensalmente"];

        if(r4 == []){

            const actualTime = this.getActualTime();

        if(this.verifyInputs(initialDate, initialTime, finalDate, finalTime) || types.indexOf(type) == -1){
                
            let id = this.getRandomInt(1, 100000);
            const r = text.filter(it => it['id'] = id);

            while(r != []){
                id = this.getRandomInt(1, 100000);
            }
                this.rule.setId(id);
                this.rule.setDateInit(initialDate);
                this.rule.setTimeInit(initialTime);
                this.rule.setDateFinish(finalDate);
                this.rule.setTimeFinish(finalTime);
                this.rule.setType(type);
                this.rule.setAvailable(true);
                this.rule.setRequestTime(actualTime);
                
                try{
                    text.push((JSON.parse(JSON.stringify(this.rule))));
                    console.log(text);
                }catch(err){
                    console.log(text)
                }

                fs.writeFile('./data.json', JSON.stringify(text) ,function(){
                    res.status(200).json({ message : "Rule was succesfully created!", "id" : this.rule.getId().toString }).send().end();
                });
            }else{
                    res.status(403).json({ "message" : "Bad request. Insert valid inputs!"});
            }
        }else{
            res.status(401).json({ "message" : "Unavailable time!"});
        }  
    }

    // Exibe as regras com horários disponíveis
    public getAvailableTimes(req: Request, res : Response){

        let text = this.readJson();
        let res1 =  text.filter(it => it['deleted'] == false);
        let res2 =  res1.filter(it => it['available'] == true);
        res.status(200).json(res2).send().end(); 
    }

    //Listar regras cadastradas
    public getRules (req: Request, res: Response): void {      
        const rules = this.readJson();

        let result =  rules.filter(it => it['deleted'] == false);

        if(result === []){
            res.json({ message : 'Theres no rules'}).send().end();
        }else{
            res.json({ result }).send().end();  
        }
    }

    // Retorna uma única regra
    public getSpecificRule(req: Request, res: Response){
        const rules : Array<JSON> = this.readJson();
        const id : String = req.params.id;

        let resu =  rules.filter(it => it['id'] == id);
        let result =  resu.filter(it => it['deleted'] == false);
        
        res.status(200).json(result).send().end(); 
    }

    //Remocao Lógica
    public removeRule (req: Request, res: Response) {  
        const id = req.params.id;
        const rules : Array<JSON> = this.readJson();
        let result = rules.filter(it => it['id'] = id);
        result.keys['removed'] = false;

        fs.writeFile('./data.json', JSON.stringify(result), function(err){
            if(err){
                res.status(500).json({ message : "Unexpected error!"}).send().end();
            }else{
                res.status(200).json({ message : 'rule was succesfullt removed' }).send().end();
            }        
        })
    }

    //Remoção fisica
    public destroyRule(req: Request, res:Response){

        const id = req.params.id;
        const rules : Array<JSON> = this.readJson();
      
        let result = rules.filter(it => it['id'] != id);
            
        fs.writeFile('./data.json', JSON.stringify(result), function(err) {
            if(err){
                res.status(500).json({ message : "Unexpected error!"}).send().end();
            }else{
                res.status(200).json({ message : 'rule was succesfullt removed' }).send().end();
                }        
            });
    }


    public consult(req: Request, res : Response){

        let text = this.readJson();
        let res1 =  text.filter(it => it['deleted'] == false);
        let res2 =  res1.filter(it => it['available'] == true);
        let av = []; 

        res2.forEach(element => {
            let dateinit = Date.parse(element['dateInit']);
            let timeinit = Date.parse(element['timeInit']);
            let datefinish = Date.parse(element['dateFinish']);
            let timefinish = Date.parse(element['timeFinish']);


            /*if(){
                av.push(element);
            }*/
        });
        res.status(200).json(av).send().end(); 
    }

    private readJson():Array<JSON>{
        const text = fs.readFileSync("./data.json");
        let v; 
        try{
            v = JSON.parse(text.toString());
            return v;
        }catch(err){
            return v;
        }    
    }

    private getActualTime() : String{

        const d = new Date;

        let requestMonthF : String;
        let requestDayF : String;
        let requestHourF : String;
        let requestMinutsF : String;
        let requestSecondsF : String;

        let requestYear = d.getFullYear();
        let requestMonth = d.getMonth();
        let requestDay = d.getDay();
        let requestHour = d.getHours();
        let requestMinuts = d.getMinutes();
        let requestSeconds = d.getSeconds();

        if(requestDay < 10){
            requestDayF = "0"+requestDay;
        }else{
            requestDayF = requestDay.toString();
        }

        if(requestMonth < 10){
            requestMonthF = "0"+requestMonth;
        }else{
            requestMonthF = requestMonth.toString();
        }

        if(requestHour < 10){
            requestHourF = "0"+requestHour;
        }else{
            requestHourF = requestHour.toString();
        }

        if(requestMinuts < 10){
            requestMinutsF = "0"+requestMinuts;
        }else{
            requestMinutsF = requestMinuts.toString();
        }

        if(requestSeconds < 10){
            requestSecondsF = "0"+requestSeconds;
        }else{
            requestSecondsF = requestSeconds.toString();
        }

        return requestDayF+"-"+requestMonthF+"-"+requestYear+"-"+requestHourF+":"+requestMinutsF+":"+requestSecondsF;
    }

    private getRandomInt(min, max) : Number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    private verifyInputs(initialDate, initialTime, finalDate, finalTime) : Boolean{

        try{

            if(initialDate.substring(2, 3) != "-" || initialDate.substring(5, 6) != "-"
                || finalDate.substring(2 , 3) != "-" || finalDate.substring(5 ,6) != "-"){
                return false;
            }
            if(initialTime.substring(2, 3) != ":" || initialTime.substring(5, 6) != ":"
                || finalTime.substring(2 , 3) != ":" || finalTime.substring(5 ,6) != ":"){
                return false;
            }

            let d1 = Number.parseInt(initialDate.substring(0 ,2));
            let mo1 = Number.parseInt(initialDate.substring(3 ,5));
            let a1 = Number.parseInt(initialDate.substring(6 ,10));

            let h1 = Number.parseInt(initialTime.substring(0 ,2));
            let m1 = Number.parseInt(initialTime.substring(3 ,5));
            let s1 = Number.parseInt(initialTime.substring(6 ,8));

            let d2 = Number.parseInt(finalDate.substring(0 ,2));
            let mo2 = Number.parseInt(finalDate.substring(3 ,5));
            let a2 = Number.parseInt(finalDate.substring(6 ,10));

            let h2 = Number.parseInt(finalTime.substring(0 ,2));
            let m2 = Number.parseInt(finalTime.substring(3 ,5));
            let s2 = Number.parseInt(finalTime.substring(6 ,8));

            if(d1 > 31 || d1 < 1 || d2 > 31 || d2 < 1){
                return false;
            }
            if(mo1 > 12 || mo2 > 12 || mo1 < 1 || mo2 > 12){
                return false;
            }
            if(h1 < 0 || h1 > 23 || h2 < 0|| h2 > 23){
                return false;
            }

            if(m1 > 59 || m1 < 0 || m2 > 59 || m2 < 0 || s1 > 59 || s1 < 0 || s2 > 59 || s2 < 0){
                return false;
            }

            return true;
        }catch(err){
            return false;
        }
    }

    
}