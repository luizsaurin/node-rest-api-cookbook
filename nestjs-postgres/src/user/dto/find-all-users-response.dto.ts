import { User } from '../user.entity'
import { UserDto } from './user.dto'

export class FindAllUsersResponseDto {
	totalResults: number
	users: UserDto[]

	constructor(users: User[]) {
		this.totalResults = users.length
		this.users = users.map((user) => new UserDto(user))
	}
}
