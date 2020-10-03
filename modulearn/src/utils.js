import { kedro_modules } from './data'

export const getModule = position => {
  for (const module of kedro_modules) {
    if (position > module.start && position < module.end) {
      return module
    }
  }
}

