import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import * as cookieParser from 'cookie-parser'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const configService = app.get(ConfigService)
  const port = 5001
	
  await app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: 'concept',
			protoPath: join(process.cwd(), 'src/concepts/concept.proto'),
			url: configService.get('GRPC_CONNECTION_URL'),
		},
	})

	app.startAllMicroservices()

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	})

	app.use(cookieParser())
	app.setGlobalPrefix('api')

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		})
	)

	await app.listen(port)
	console.log(`listening on port ${await app.getUrl()}`)
}
bootstrap()
