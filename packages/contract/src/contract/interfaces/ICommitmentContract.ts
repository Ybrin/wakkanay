import { Bytes, BigNumber } from '@cryptoeconomicslab/primitives'

export interface ICommitmentContract {
  submit(blockNumber: BigNumber, root: Bytes): Promise<void>

  getCurrentBlock(): Promise<BigNumber>

  getRoot(blockNumber: BigNumber): Promise<Bytes>

  subscribeBlockSubmitted(
    handler: (blockNumber: BigNumber, root: Bytes) => void
  ): void
}
