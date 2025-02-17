import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'
import { UserRole } from '../enum/user-role.enum'

export class UpdateUserRequestDto {
	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	password: string

	@IsOptional()
	@IsEnum(UserRole)
	role: UserRole
}
