import { scrypt as _scrypt, randomBytes } from 'crypto'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { promisify } from 'util'
import { UserRole } from './enum/user-role.enum'

const scrypt = promisify(_scrypt)

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ unique: true })
	email: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
	role: UserRole

	@CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
	updatedAt: Date

	@Column({ name: 'password_changed_at', type: 'timestamptz', nullable: true })
	passwordChangedAt: Date

	async updatePassword(newPassword: string): Promise<void> {
		if (await this.comparePassword(this.password, newPassword)) return

		this.password = await this.encryptPassword(newPassword)
		this.passwordChangedAt = new Date()
	}

	async encryptPassword(password: string): Promise<string> {
		const salt = randomBytes(8).toString('hex')
		const hash = (await scrypt(password, salt, 32)) as Buffer
		return salt + '.' + hash.toString('hex')
	}

	async comparePassword(hashedPassword: string, candidatePassword: string): Promise<boolean> {
		const [salt, storedHash] = hashedPassword.split('.')
		const hash = (await scrypt(candidatePassword, salt, 32)) as Buffer

		return storedHash === hash.toString('hex')
	}
}
