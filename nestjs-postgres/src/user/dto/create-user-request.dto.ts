import { IsEmail, IsString } from 'class-validator'

export class CreateUserRequestDto {
	@IsString()
	name: string

	@IsEmail()
	email: string

	@IsString()
	password: string
}
