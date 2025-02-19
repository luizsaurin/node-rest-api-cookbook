import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule,
		UserModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECRET'),
				signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
			})
		})
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
	exports: [AuthService]
})
export class AuthModule {}
