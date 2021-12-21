import {IsString, IsNotEmpty, IsObject, ValidateNested} from 'class-validator'
import {Type} from 'class-transformer'

class MessageProperties {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    body: string

    @IsString()
    @IsNotEmpty()
    author: string
}

export class CreateMessageDto {
    @ValidateNested({each: true})
    @IsObject()
    @IsNotEmpty()
    @Type(() => MessageProperties)
    message: MessageProperties
}