import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Concept {
	@PrimaryGeneratedColumn('uuid')
	public id: string

	@Column({
		name: 'imageData',
		type: 'bytea',
		nullable: false,
	})
	public imageData: Buffer

	@Column()
	public results: string
}
