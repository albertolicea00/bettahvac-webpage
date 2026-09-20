import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { initClarity } from './lib/clarity.js'

// Initialize Microsoft Clarity tracking (runs in production or when VITE_CLARITY_DEV=true)
initClarity()

const target = document.getElementById('app')
if (!target) {
  throw new Error('Root element #app not found')
}

const app = mount(App, { target })

export default app
