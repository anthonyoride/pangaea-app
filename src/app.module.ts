import {Module} from '@nestjs/common'
import {BullModule} from '@nestjs/bull'
import {NotificationModule} from './modules/notification/notification.module'
import {ConfigModule} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import {EventEmitterModule} from '@nestjs/event-emitter'
import * as Joi from 'joi'
import {getConnectionOptions} from 'typeorm'

@Module({
    imports: [
        NotificationModule,
        EventEmitterModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            }
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().default('dev'),
                PORT: Joi.number().default(3000)
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getConnectionOptions(), {
                autoLoadEntities: true
            })
        })
    ]
})

export class AppModule {}