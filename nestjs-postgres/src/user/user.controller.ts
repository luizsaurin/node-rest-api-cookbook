import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { CreateUserRequestDto } from './dto/create-user-request.dto'
import { FindAllUsersRequestDto } from './dto/find-all-users-request.dto'
import { FindAllUsersResponseDto } from './dto/find-all-users-response.dto'
import { UserDto } from './dto/user.dto'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('api/v1/users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(@Query() query: FindAllUsersRequestDto): Promise<FindAllUsersResponseDto> {
		const users = await this.userService.findAll(query)
		return new FindAllUsersResponseDto(users)
	}

	@Get(':id')
	async findById(@Param('id') id: number): Promise<UserDto> {
		const user = (await this.userService.findById(id)) as User
		return new UserDto(user)
	}

	@Post()
	async create(@Body() dto: CreateUserRequestDto): Promise<UserDto> {
		const user = await this.userService.create(dto.name, dto.email, dto.password)
		return new UserDto(user)
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() user: Partial<User>) {
		const updatedUser = (await this.userService.update(id, user)) as User
		return new UserDto(updatedUser)
	}

	@Delete(':id')
	async remove(@Param('id') id: number): Promise<void> {
		return await this.userService.remove(id)
	}
}
