import type { MiddlewareHandler, Context, Next } from "hono"
import type { Logger } from "pino"

import pino from "pino"
import { getPath } from "hono/utils/url"

export const pinoLogger = (logger: Logger = pino({ level: "info" })): MiddlewareHandler => {
  return async (c: Context, next: Next) => {
    const { method } = c.req
    const path = getPath(c.req.raw)

    logger.info(
      {
        requestId: "requestId" in c.req ? c.req.requestId : undefined,
        request: {
          method,
          path,
        },
      },
      "Incoming request",
    )

    const start = Date.now()

    await next()

    const { status } = c.res

    logger.info(
      {
        requestId: "requestId" in c.req ? c.req.requestId : undefined,
        response: {
          status,
          ok: String(c.res.ok),
          time: time(start),
        },
      },
      "Request completed",
    )
  }
}

function humanize(times: string[]): string {
  const [delimiter, separator] = [",", "."]
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter))

  return orderTimes.join(separator)
}

function time(start: number): string {
  const delta = Date.now() - start

  return humanize([delta < 1000 ? delta + "ms" : Math.round(delta / 1000) + "s"])
}
