import {Job} from 'bull'
import {HttpService} from '@nestjs/axios'
import {Processor, Process, OnQueueActive, OnQueueError, OnQueueCompleted} from '@nestjs/bull'
import {Message} from '../../entities/message.entity'
import {Subscription} from '../../entities/subscription.entity'

@Processor('message')
export class MessageForwaderConsumer {
    constructor(private httpService: HttpService) {}

    @Process('forward')
    async forwardMessage(job: Job<{message: Message,  subscriber: Subscription}>) { 
        let progress = 0
        for(let index = 0; index < 100; index++) {
            const forward = this.httpService.post(job.data.subscriber.url, job.data.message)
            progress += 10
            await job.progress(progress)
        }
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        )
    }

    @OnQueueError()
    onError(error: Error) {
        console.log('Queue Error', error.message)
    }

    @OnQueueCompleted()
    onCompleted(job: Job, result: any) {
        console.log('Job Completed', result)
    }
}