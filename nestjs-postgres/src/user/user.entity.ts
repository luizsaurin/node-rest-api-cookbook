import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserRole } from './enum/user-role.enum'

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
}
