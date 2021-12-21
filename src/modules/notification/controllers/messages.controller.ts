import {Controller, Post, Body, Param} from '@nestjs/common'
import {MessageService} from '../services/messages.service'
import {CreateMessageDto} from '../dto/create-message.dto'
import {FindTopicParams} from '../dto/find-topic-param.dto'

@Controller('messages')
export class MessageController {
    constructor(private messageService: MessageService) {}

    @Post('publish/:topic')
    async publish(@Param() params: FindTopicParams, @Body() payload: CreateMessageDto) {
        return this.messageService.publish(params.topic, payload)
    } 
}