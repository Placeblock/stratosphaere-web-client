
export class WSMessage {
    action: string;

    constructor(action: string) {
        this.action = action;
    }
}

export class SensorsMessage extends WSMessage {
    data: {"sensor":string,"values":{"time":number,"value":{}}[]}[];
    constructor(data: {"sensor":string,"values":{"time":number,"value":{}}[]}[]) {
        super("sensor");
        this.data = data;
    }
    
    static deserialize(data: any): SensorsMessage {
        let newdata: {"sensor":string,"values":{"time":number,"value":{}}[]}[] = data;
        return new SensorsMessage(newdata);
    }
}