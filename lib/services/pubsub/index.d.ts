import Request from '../../helpers/request.helper';
interface INotification {
    userId: string;
    text?: string;
    data?: any;
}
interface Message {
    request: Request;
    type: string;
    metadata?: any;
    notifications?: INotification[];
    data: any;
}
interface Subscriber {
    processMessage(message: Message): any;
}
interface Subscription {
    [key: string]: Subscriber[];
}
declare class Main {
    subscription: Subscription;
    addSubscriberAll: (messageTypes: any, subscriber: Subscriber) => void;
    addSubscriber: (messageType: string, subscriber: Subscriber) => void;
    removeSubscriber: (messageType: string, subscriber: Subscriber) => void;
    publishMessage: (message: Message) => void;
}
declare const Organizer: Main;
export { Message, Subscriber, Organizer };
