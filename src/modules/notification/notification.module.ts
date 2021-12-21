import {Module} from '@nestjs/common'
import {BullModule} from '@nestjs/bull'
import {HttpModule} from '@nestjs/axios'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Message} from './entities/message.entity'
import {Subscription} from './entities/subscription.entity'
import {MessageService} from './services/messages.service'
import {SubscriptionService} from './services/subscriptions.service'
import {MessageController} from './controllers/messages.controller'
import {SubscriptionController} from './controllers/subscriptions.controller'
import {MessagePublishedListner} from './listeners/message-published.listener'
import {MessageForwaderConsumer} from './jobs/consumers/message-forwarder.consumer'

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5
        }),
        BullModule.registerQueue({
            name: 'message'
        }),
        TypeOrmModule.forFeature([Message, Subscription])
    ],
    controllers: [MessageController, SubscriptionController],
    providers: [MessageService, SubscriptionService, MessagePublishedListner, MessageForwaderConsumer]
})

export class NotificationModule {}