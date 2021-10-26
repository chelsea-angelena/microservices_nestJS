import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const isProduction = configService.get('STAGE') === 'production'
				return {
					ssl: isProduction,
					extra: { ssl: isProduction ? { rejectUnauthorized: false } : null },
					type: 'postgres',
					host: 'localhost',
					port: 5432,
					username: configService.get('DB_USERNAME'),
					password: configService.get('DB_PASSWORD'),
          rootPassword: configService.get('DB_ROOT_PASSWORD'),
					database: configService.get('DB_DATABSE'),
					autoLoadEntities: true,
					synchronize: true,
				}
			},
		}),
	],
})
export class DatabaseModule {}
