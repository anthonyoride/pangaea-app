import {IsString, IsNotEmpty} from 'class-validator'

export class FindTopicParams {
    @IsString()
    @IsNotEmpty()
    topic: string
}