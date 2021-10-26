import { Module } from '@nestjs/common'
import ConceptController from './concept.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxyFactory, Transport } from '@nestjs/microservices'
import { join } from 'path'

@Module({
	imports: [ConfigModule],
	controllers: [ConceptController],
	providers: [
		{
			provide: 'Concept_PACKAGE',
			useFactory: (configService: ConfigService) => {
				return ClientProxyFactory.create({
					transport: Transport.GRPC,
					options: {
						package: 'concept',
						protoPath: join(process.cwd(), 'src/concepts/concept.proto'),
						url: configService.get('GRPC_CONNECTION_URL'),
					},
				})
			},
			inject: [ConfigService],
		},
	],
})
export class ConceptClientModule {}
