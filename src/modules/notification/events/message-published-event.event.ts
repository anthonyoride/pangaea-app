import {Message} from '../entities/message.entity'

export class MessagePublishedEvent {
    public message: Message 
    constructor(message: Message) {
        this.message = message
    }
}