import { writable, derived } from 'svelte/store'
import modules from './data'

export const currentModule = writable(modules[0])
export const position = writable(0)
export const muted = writable(false)
export const uid = derived(currentModule, $currentModule => $currentModule && $currentModule.uid)
