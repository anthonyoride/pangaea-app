import {Repository} from 'typeorm'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Subscription} from '../entities/subscription.entity'
import {ISubscription} from '../interfaces/subscription.interface'

@Injectable()
export class SubscriptionService {
    constructor(@InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>) {}

    async subscribe(topic: string, payload: ISubscription): Promise<Subscription> {
        const subscription = this.subscriptionRepository.create({
            topic,
            url: payload.url
        })

        return this.subscriptionRepository.save(subscription)
    }

    async findAllByTopic(topic: string): Promise<Subscription[]> {
        return this.subscriptionRepository.find({topic})
    }
}