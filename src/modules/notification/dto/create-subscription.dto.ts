import {IsUrl, IsNotEmpty} from 'class-validator'

export class CreateSubscriptionDto {
    @IsUrl()
    @IsNotEmpty()
    url: string
}