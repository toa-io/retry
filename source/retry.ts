export async function retry<T>
(operation: Operation<T>, options?: Options): Promise<T> {
  const parameters = options === undefined ? DEFAULTS : { ...DEFAULTS, ...options }

  let attempt = 0

  while (attempt < parameters.attempts) {
    const result = await operation(again)

    if (result !== again)
      return result

    await delay(parameters, attempt)
    attempt++
  }

  throw new Error('Maximum attempts exceeded')
}

async function delay (parameters: Parameters, attempt: number): Promise<void> {
  const interval = Math.min(parameters.base * Math.pow(parameters.factor, attempt), parameters.max)
  const dispersion = interval * parameters.dispersion * (Math.random() - 0.5)

  await new Promise((resolve) => setTimeout(resolve, interval + dispersion))
}

const again = Symbol('again')

const DEFAULTS = {
  attempts: Infinity,
  base: 1000,
  max: 30000,
  factor: 1.5,
  dispersion: 0.1
}

type Again = typeof again
type Parameters = typeof DEFAULTS
export type Options = Partial<Parameters>
export type Operation<T> = (retry: Again) => Promise<T | Again>
