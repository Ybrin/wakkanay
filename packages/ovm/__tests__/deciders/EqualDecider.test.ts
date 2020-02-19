import { BigNumber } from '@cryptoeconomicslab/primitives'
import Coder from '@cryptoeconomicslab/coder'
import { EqualDecider } from '../../src'
import { MockDeciderManager } from '../mocks/MockDeciderManager'
import { setupContext } from '@cryptoeconomicslab/context'
setupContext({ coder: Coder })

describe('EqualDecider', () => {
  const decider = new EqualDecider()
  const deciderManager = new MockDeciderManager()

  test('decide true', async () => {
    const decision = await decider.decide(deciderManager, [
      Coder.encode(BigNumber.from(10)),
      Coder.encode(BigNumber.from(10))
    ])

    expect(decision.outcome).toBeTruthy()
  })

  test('decide false', async () => {
    const decision = await decider.decide(deciderManager, [
      Coder.encode(BigNumber.from(1)),
      Coder.encode(BigNumber.from(10))
    ])

    expect(decision.outcome).toBeFalsy()
  })

  test('return decision with debugInfo', async () => {
    const decision = await decider.decide(deciderManager, [
      Coder.encode(BigNumber.from(1))
    ])

    expect(decision.outcome).toBeFalsy()
  })
})
