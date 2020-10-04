import { modules } from './data'
import { uid } from './stores'
import { get } from 'svelte/store';

export const getModule = (position, currentModule) => {
  if (!currentModule) return modules[0]
  if (position < currentModule.end && currentModule.uid != get(uid).value) {
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

