import { Controller } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Concept } from '../entity/concept.entity'
import { CreateConceptDto } from '../dto/concept.dto'
import { Repository } from 'typeorm'
import { GrpcMethod } from '@nestjs/microservices'


const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc')
const stub = ClarifaiStub.grpc()
const metadata = new grpc.Metadata()
metadata.set('authorization', 'Key 2a4398fc41b8427495b952a20b548e93')

@Controller()
export class ConceptService {
	constructor(
		@InjectRepository(Concept)
		private ConceptsRepository: Repository<Concept>
	) {}

	@GrpcMethod()
	async addConcept(concept: CreateConceptDto) {
		return await stub.PostModelOutputs(
			{
				model_id: 'aaa03c23b3724a16a56b629203edc62c',
				inputs: [{ data: { image: concept } }],
			},
			metadata,
			async (err, response) => {
				if (err) {
					console.log('Error: ' + err)
					return
				}

				if (response.status.code !== 10000) {
					console.log(
						'Received failed status: ' +
							response.status.description +
							'\n' +
							response.status.details
					)
					return
				}

				let conceptResults = ''
				for (const c of response.outputs[0].data.concepts) {
					conceptResults += c.name + ': ' + c.value
				}
				const newConcept = await this.ConceptsRepository.create({
					imageData: Buffer.from(concept.base64, 'base64'),
					results: conceptResults,
				})
				await this.ConceptsRepository.save(newConcept)
				return conceptResults
				// console.log(newConcept, 'new')
				// const tryReturn = await this.ReturnNewConcept(newConcept)
				// console.log(tryReturn)
			}
		)
	}

	@GrpcMethod()
	async ReturnNewConcept(result) {
		console.log(result, 'result')
		// const data = await this.ConceptsRepository.findOne({ id: +id }).toPromise()
		return {
			result,
		}
	}

	@GrpcMethod()
	async getAllConcepts() {
		const data = await this.ConceptsRepository.find()
		return {
			data,
		}
	}
}
