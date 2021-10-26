import { CreateConceptDto } from '../dto/concept.dto'
import { Concept } from '../entity/concept.entity'

interface ConceptService {
	addConcept(concept: CreateConceptDto): Promise<any>
	returnNewConcept(concept: Concept): Promise<Concept>
	getAllConcepts(params: {}): Promise<{ data: Concept[] }>
}

export default ConceptService
