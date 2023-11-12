import { type Options, retry } from './retry'

it('should be', async () => {
  expect(retry).toBeDefined()
})

it('should return value', async () => {
  const result = await retry<number>(async () => 1)

  expect(result).toBe(1)
})

it('should retry', async () => {
  const start = Date.now()
  let count = 0

  const result = await retry<number>(async (next) => {
    count++

    if (count < 3)
      return next

    return 1
  }, parameters)

  expect(Date.now() - start).toBeGreaterThan(22)
  expect(count).toBe(3)
  expect(result).toBe(1)
})

it('should throw after maximum attempts', async () => {
  let count = 0

  const promise = retry<number>(async (next) => {
    if (count++ < 5)
      return next

    return 1
  }, parameters)

  await expect(promise).rejects.toThrow('Maximum attempts exceeded')
})

const parameters: Options = {
  attempts: 3,
  base: 10
}
