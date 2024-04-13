# Pino logger middleware for Hono

This middleware integrates [Hono](https://github.com/honojs/hono) with [Pino](https://github.com/pinojs/pino).

## Installation

```plain
npm i hono hono-pino-logger
```

## How to Use

Default:
```ts
import { Hono } from "hono"
import { pinoLogger } from "hono-pino-logger"

const app = new Hono()

app.use('*', pinoLogger())

export default app
```

Custom:
```ts
import { Hono } from "hono"
import { pinoLogger } from "hono-pino-logger"
import pino from "pino"

const logger = pino({ level: "error" })
const app = new Hono()

app.use('*', pinoLogger(logger))

export default app
```

## Authors

- Maksym Herasymov - <https://github.com/maks-herasymov>

## License

MIT
