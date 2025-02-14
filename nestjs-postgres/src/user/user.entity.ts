import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { UserRole } from './enum/user-role.enum'
import { randomBytes, scrypt as _scrypt } from 'crypto'
import { promisify } from 'util'

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

	@BeforeInsert()
	private async beforeInsert() {
		await this.encryptPassword()
	}

	@BeforeUpdate()
	private async beforeUpdate() {
		await this.encryptPassword()
	}

	private async encryptPassword(): Promise<void> {
		const salt = randomBytes(8).toString('hex')
		const hash = (await scrypt(this.password, salt, 32)) as Buffer
		this.password = salt + '.' + hash.toString('hex')
	}

	private async comparePassword(storedPassword: string, candidatePassword: string): Promise<boolean> {
		const [salt, storedHash] = this.password.split('.')
		const hash = (await scrypt(candidatePassword, salt, 32)) as Buffer

		return storedHash !== hash.toString('hex')
	}
}
