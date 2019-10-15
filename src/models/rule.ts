
export class Rule{

    private dateInit;
    private dateFinish;
    private timeInit;
    private timeFinish;
    private requestTime;
    private deleted : Boolean;
    private id : Number;
    private available : Boolean;
    private type : String;

    constructor(){
    }

    public getDateInit(){
        return this.dateInit;
    }

    public getDateFinish(){
        return this.dateFinish;
    }

    public getTimeInit(){
        return this.timeInit;
    }

    public getTimeFinish(){
        return this.timeFinish;
    }

    public getRequestTime(){
        return this.requestTime;
    }

    public isDeleted(): Boolean{
        return this.deleted;
    }

    public isAvailable(): Boolean{
        return this.available;
    }

    public getId(): Number{
        return this.id;
    }

    public getType() : String{
        return this.type;
    }

    public setType(type): void{
        this.type = type;
    }

    public setAvailable(available): void{
        this.available = available;
    }

    public setDateInit(dateInit): void{
        this.dateInit = dateInit;
    }

    public setDateFinish(dateFinish): void{
        this.dateFinish;
    }

    public setTimeInit(timeInit): void{
        this.timeInit = timeInit;
    }

    public setTimeFinish(timeFinish): void{
        this.timeFinish = timeFinish;
    }

    public setRequestTime(requestTime): void{
        this.requestTime = requestTime;
    }

    public setDeleted(deleted): void{
        this.deleted = deleted;
    }

    public setId(id): void{
        this.id = id;
    }


}