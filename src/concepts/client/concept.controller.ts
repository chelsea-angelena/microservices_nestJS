import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UseInterceptors,
	ClassSerializerInterceptor,
	Inject,
	OnModuleInit,
} from '@nestjs/common'
import { join } from 'path'
import { Concept } from '../entity/concept.entity'
// import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { CreateConceptDto } from '../dto/concept.dto'
import { ClientGrpc } from '@nestjs/microservices'
import ConceptService from './concept.service.interface'
import { Observable } from 'rxjs'

const protobuf = require('protobufjs')

@Controller('concepts')
@UseInterceptors(ClassSerializerInterceptor)
export default class ConceptController implements OnModuleInit {
	private ConceptService: ConceptService

	constructor(@Inject('Concept_PACKAGE') private client: ClientGrpc) {}

	onModuleInit() {
		this.ConceptService =
			this.client.getService<ConceptService>('ConceptService')
	}

	@Get()
	async getConcepts() {
		return this.ConceptService.getAllConcepts({})
	}

	@Post()
	// @UseGuards(JwtAuthenticationGuard)
	async createPost(@Body() body) {
		const concept: CreateConceptDto = { base64: body.body }
		const result = await this.ConceptService.addConcept(concept)
		// const root = await protobuf.load(
		// 	join(process.cwd(), 'src/concepts/concept.proto')
		// )
		console.log(result.subscriber)

		// if (result) {
		// 	const returnResult = await this.ConceptService.returnNewConcept(result)
		// 	console.log(returnResult, 'return result')
		// }
		// rconst Concept = root.lookupType('Concept_PACKAGE')
	}
}
