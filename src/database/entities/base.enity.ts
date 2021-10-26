import {
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

export abstract class Base {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@CreateDateColumn({ type: 'timestamp with time zone', default: 'NOW()' })
	createdDate: Date

	@UpdateDateColumn({
		type: 'timestamp with time zone',
		default: 'NOW()',
		nullable: true,
	})
	updatedDate: Date
}
