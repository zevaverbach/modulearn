import { writable, derived } from 'svelte/store'

export const currentModule = writable(null)
export const position = writable(0)
export const uid = derived(currentModule, $currentModule => $currentModule && $currentModule.uid)
