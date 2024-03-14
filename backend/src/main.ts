import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cors from 'cors'

async function bootstrap() {
    const PORT: number = Number(process.env.PORT) || 5000;
    const app = await NestFactory.create(AppModule, { cors: { origin: true, credentials: true } });

    app.setGlobalPrefix('api');
    const config = new DocumentBuilder().setTitle('API панели администратора').setBasePath('api').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.enableCors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    await app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        console.log(`API docs: http://localhost:5000/docs#/`);
    });
}
bootstrap();
