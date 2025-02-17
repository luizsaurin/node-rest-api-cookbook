import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { FindAllUsersRequestDto } from './dto/find-all-users-request.dto'
import { CreateUserRequestDto } from './dto/create-user-request.dto'
import { UpdateUserRequestDto } from './dto/update-user-request.dto'

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findAll(query: FindAllUsersRequestDto): Promise<User[]> {
		const { skip, take, sort, name, email } = query

		const queryBuilder = this.userRepository.createQueryBuilder()

		if (name) {
			queryBuilder.where('name = :name', { name })
		}

		if (email) {
			queryBuilder.where('email = :email', { email })
		}

		if (sort) {
			let [column, order] = sort.split(',')

			column = column ? column.trim() : 'id'

			queryBuilder.orderBy(column, order === 'asc' ? 'ASC' : 'DESC')
		} else {
			queryBuilder.orderBy('id', 'DESC')
		}

		queryBuilder.skip(skip ? skip : 0)
		queryBuilder.take(take ? take : 10)

		return await queryBuilder.getMany()
	}

	async findById(id: number): Promise<User | null> {
		const user = await this.userRepository.findOne({ where: { id } })

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	async create(dto: CreateUserRequestDto): Promise<User> {
		const user = this.userRepository.create(dto) as User
		if (user.password) user.password = await user.encryptPassword(user.password)
		return await this.userRepository.save(user)
	}

	async update(id: number, dto: UpdateUserRequestDto): Promise<User | null> {
		const user = await this.findById(id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		if (dto.name) user.name = dto.name
		if (dto.email) user.email = dto.email
		if (dto.role) user.role = dto.role
		if (dto.password) await user.updatePassword(dto.password)

		return this.userRepository.save(user)
	}

	async remove(id: number): Promise<void> {
		const user = await this.findById(id)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		await this.userRepository.delete(id)
	}
}
