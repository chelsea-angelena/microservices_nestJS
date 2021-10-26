import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Concept } from '../entity/concept.entity'
import { ConceptService } from './concept.server.service'

@Module({
	imports: [TypeOrmModule.forFeature([Concept])],
	exports: [],
	controllers: [ConceptService],
})
export class ConceptServerModule {}
