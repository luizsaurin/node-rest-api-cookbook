import { Transform } from 'class-transformer'
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator'

export class FindAllUsersRequestDto {
	@Transform(({ value }) => parseInt(value))
	@IsOptional()
	@IsNumber()
	skip: number

	@Transform(({ value }) => parseInt(value))
	@IsOptional()
	@IsNumber()
	take: number

	@IsOptional()
	@IsString()
	sort: string

	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsEmail()
	email: string
}
