import Request from '../../helpers/request.helper';

interface Message{
    request:Request,
    type:string,
    metadata?:any,
    data:any,
    callback?:Function
}

interface Subscriber{
    processMessage(message:Message) : any
}

interface Subscription{
    [key: string]:Subscriber[]
}

class Main{
    
    //HashMap<String,ArrayList<Subscriber>>

    subscription : Subscription = {};

    addSubscriberAll = (messageTypes:any, subscriber:Subscriber) => {
        const topics = [];
        for(const k of Object.keys(messageTypes)){
            if(typeof messageTypes[k] === typeof 's'){
                topics.push(messageTypes[k]);
            }else{
                this.addSubscriberAll(messageTypes[k],subscriber);
            }
        }
        for(const t of topics){
            this.addSubscriber(t,subscriber);
        }
    }

    addSubscriber = (messageType:string, subscriber:Subscriber) => {
        if(messageType in this.subscription === false){
            this.subscription[messageType] = []
        }
        this.subscription[messageType].push(subscriber);
    }

    removeSubscriber = (messageType:string, subscriber:Subscriber) => {
        this.subscription[messageType] = this.subscription[messageType].filter(
            function(value:Subscriber, index, arr){
                return value!=subscriber;
            }
        );
    }

    publishMessage = async(message:Message) => {
        console.log('PubSub',message,this.subscription);
        var sub = this.subscription;
        return await new Promise<string>(function(resolve,reject){
            for(const subscriber of sub[message.type]){
                try {
                    subscriber.processMessage(message)
                } catch (error) {
                    console.log(error)
                }
            }
            resolve('done')
        });
    }

}

const Organizer = new Main();

export {
    Message,
    Subscriber,
    Organizer
}