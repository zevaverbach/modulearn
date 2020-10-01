import DATA from './data'

export const getModuleIndex = moduleName => {
  for (const module of DATA.modules) {
    if (module.name === moduleName) {
      return module.index
    }
  }
}

export const getModule = position => {
  for (const module of DATA.modules) {
    if (position > module.start && position < module.end) {
      return module
    }
  }
}

