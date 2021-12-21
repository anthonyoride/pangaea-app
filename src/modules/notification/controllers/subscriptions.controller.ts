import {Controller, Post, Body, Param} from '@nestjs/common'
import {FindTopicParams} from '../dto/find-topic-param.dto'
import {CreateSubscriptionDto} from '../dto/create-subscription.dto'
import {SubscriptionService} from '../services/subscriptions.service'

@Controller('subscriptions')
export class SubscriptionController {
    constructor(private subscriptionService: SubscriptionService) {}

    @Post('subscribe/:topic')
    async publish(@Param() params: FindTopicParams, @Body() payload: CreateSubscriptionDto) {
        return this.subscriptionService.subscribe(params.topic, payload)
    } 
}