# Retry

Retry failed operations using exponential backoff.

## Example

```typescript
import { retry } from 'reretry';

const result = await retry(async (again) => {
  const response = await fetch('https://example.com')

  if (!response.ok)
    return again // retry
  else
    return response.json()
}, {
  attempts: Infinity,
  base: 1000,
  max: 30000,
  factor: 1.5,
  dispersion: 0.1
})
```

## Options

- `attempts` - maximum number of attempts to retry, throws an error if exceeded. Default: `Infinity`.
- `base` - base delay in milliseconds. Default: `1000`.
- `max` - maximum delay in milliseconds. Default: `30000`.
- `factor` - exponential factor. Default: `1.5`.
- `dispersion` - randomization factor. Default: `0.1`.
