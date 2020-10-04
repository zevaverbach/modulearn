import { modules } from './data'

export const getModule = (position, currentModule) => {
  if (!currentModule) return modules[0]
  if (position < currentModule.end) {
    return currentModule
  }
 
  for (const module of modules) {
    if (module.index < currentModule.index) {
       continue
    }

    if (currentModule.index - module.index > 1) {
       continue
    }

    if (position > module.start && position < module.end) {
       return module
    }
  }
}

