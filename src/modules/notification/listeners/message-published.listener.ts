import {Queue} from 'bull'
import {InjectQueue} from '@nestjs/bull'
import {Injectable} from '@nestjs/common'
import {OnEvent} from '@nestjs/event-emitter'
import {Message} from '../entities/message.entity'
import {SubscriptionService} from '../services/subscriptions.service'

@Injectable()
export class MessagePublishedListner {
    constructor(
        private subscriptionService: SubscriptionService,
        @InjectQueue('message') private messageQueue: Queue
    ) {}

    @OnEvent('message.published')
    async forwardMessage(payload: {message: Message}) {
        const subscribers = await this.subscriptionService.findAllByTopic(payload.message.topic)
        for(let index = 0; index < subscribers.length; index++) {
            await this.messageQueue.add('forward', {
                payload: {
                    message: payload,
                    subscriber: subscribers[index]
                }
            })
        }
    }
}