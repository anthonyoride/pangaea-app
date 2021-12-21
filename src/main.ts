import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({
        stopAtFirstError: true
    }))
    app.setGlobalPrefix('v1')
    await app.listen(3000)
}

bootstrap()