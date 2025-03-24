import { app } from 'electron'
import { join } from 'path'
import { existsSync, mkdirSync } from 'node:fs'
import dayjs from 'dayjs'
import log from 'electron-log/main'
import type Logger from 'electron-log'

log.initialize()
// 日志文件存放位置
log.transports.file.resolvePathFn = (variables: Logger.PathVariables): string => {
  const logDir = join(app.getPath('userData'), 'logs')
  if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true })
  }
  return join(logDir, `${dayjs().format('YYYY-MM-DD')}-${variables.appVersion}.log`)
}
// log.info('info...')
// log.error('error...')
// log.warn('warn...')
// log.verbose('verbose...')
// log.debug('debug...')
// log.silly('silly...')
