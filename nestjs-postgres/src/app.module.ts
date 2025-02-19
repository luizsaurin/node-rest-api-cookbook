import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { APP_PIPE } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env'
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DATABASE_HOST'),
				port: configService.get('DATABASE_PORT'),
				username: configService.get('DATABASE_USERNAME'),
				password: configService.get('DATABASE_PASSWORD'),
				database: configService.get('DATABASE_NAME'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: configService.get('DATABASE_SYNC')
			})
		}),
		UserModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
		}
	]
})
export class AppModule {}
