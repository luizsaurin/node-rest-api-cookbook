import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login-request.dto'
import { LoginResponseDto } from './dto/login-response.dto'
import { SignupRequestDto } from './dto/signup-request.dto'
import { UserDto } from 'src/user/dto/user.dto'
import { UserService } from 'src/user/user.service'

@Controller('api/v1/auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService
	) {}

	@Post('signup')
	async signup(@Body() dto: SignupRequestDto): Promise<UserDto> {
		const user = await this.userService.create(dto)
		return new UserDto(user)
	}

	@Post('login')
	async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
		const token = await this.authService.login(dto)
		return new LoginResponseDto(token)
	}
}
