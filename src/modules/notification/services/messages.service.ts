import {Repository} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Message} from '../entities/message.entity' 
import {EventEmitter2} from '@nestjs/event-emitter'
import {IMessage} from '../interfaces/message.interface'
import {MessagePublishedEvent} from '../events/message-published-event.event'

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        private eventEmitter: EventEmitter2
    ) {}

    async publish(topic: string, payload: IMessage): Promise<Message> {
        const messagePayload = this.messageRepository.create({
            topic,
            body: payload.message.body,
            title: payload.message.title,
            author: payload.message.author
        })

        const message = await this.messageRepository.save(messagePayload)
        this.eventEmitter.emit('message.published', new MessagePublishedEvent(message))

        return message
    }


}