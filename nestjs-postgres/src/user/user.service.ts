import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findAll(): Promise<User[]> {
		return await this.userRepository.find()
	}

	async findOne(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { id } })

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async create(user: Partial<User>): Promise<User> {
		return await this.userRepository.save(user)
	}

	async update(id: number, userData: Partial<User>): Promise<User | null> {
		const user = await this.findOne(id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		Object.assign(user, userData)

		return this.userRepository.save(user)
	}

	async remove(id: number): Promise<void> {
		const user = await this.findOne(id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		await this.userRepository.delete(id)
	}
}
