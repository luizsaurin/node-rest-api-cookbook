import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/user/user.entity'
import { LoginRequestDto } from './dto/login-request.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: LoginRequestDto) {
		const user = (await this.userService.findByEmail(dto.email)) as User

		if (!user) {
			throw new NotFoundException()
		}

		if (!(await user.comparePassword(user.password, dto.password))) {
			throw new BadRequestException('Invalid password')
		}

		const payload = { sub: user.id, email: user.email, role: user.role }

		const token = this.jwtService.sign(payload)

		return token
	}
}
