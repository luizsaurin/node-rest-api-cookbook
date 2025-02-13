import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common'
import { User } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll()
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<User | null> {
		return await this.userService.findOne(id)
	}

	@Post()
	async create(@Body() user: Partial<User>): Promise<User> {
		return await this.userService.create(user)
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User | null> {
		return await this.userService.update(id, user)
	}

	@Delete(':id')
	async remove(@Param('id') id: number): Promise<void> {
		return await this.userService.remove(id)
	}
}
