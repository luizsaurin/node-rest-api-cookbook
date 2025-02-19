import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginRequestDto } from './dto/login-request.dto'
import { LoginResponsetDto } from './dto/login-response.dto'

@Controller('api/v1/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: LoginRequestDto): Promise<LoginResponsetDto> {
		const token = await this.authService.login(dto)
		return new LoginResponsetDto(token)
	}
}
