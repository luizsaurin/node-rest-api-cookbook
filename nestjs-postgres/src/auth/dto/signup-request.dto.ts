import { IsEmail, IsString } from 'class-validator'

export class SignupRequestDto {
	@IsString()
	name: string
	@IsEmail()
	email: string
	@IsString()
	password: string
}
