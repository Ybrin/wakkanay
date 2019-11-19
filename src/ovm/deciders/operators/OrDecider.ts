import { Bytes } from '../../../types/Codables'
import { Decider } from '../../interfaces/Decider'
import { Decision, Property, LogicalConnective } from '../../types'
import { DeciderManager } from '../../DeciderManager'
import { encodeProperty, decodeProperty } from '../../helpers'

export class OrDecider implements Decider {
  public async decide(
    manager: DeciderManager,
    inputs: Bytes[]
  ): Promise<Decision> {
    let properties: Array<Property>
    try {
      properties = inputs.map(decodeProperty)
    } catch (e) {
      return {
        outcome: false,
        challenges: []
      }
    }

    const decisions = await Promise.all(
      properties.map(async p => {
        return await manager.decide(p)
      })
    )

    if (decisions.every(d => d.outcome)) {
      return {
        outcome: true,
        challenges: []
      }
    }

    const challenge = {
      property: new Property(
        manager.getDeciderAddress(LogicalConnective.And),
        properties
          .map(
            p =>
              new Property(manager.getDeciderAddress(LogicalConnective.Not), [
                encodeProperty(p)
              ])
          )
          .map(encodeProperty)
      ),
      challengeInput: null
    }

    return {
      outcome: decisions.some(d => d.outcome),
      challenges: [challenge]
    }
  }
}
