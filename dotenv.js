const fs = require('node:fs')

function parseEnv(env) {
  const lines = env.split('\n')
  for (const line of lines) {
    const parts = line.split('=')
    if (parts.length === 2) {
      const key = parts[0].trim()
      const value = parts[1].trim().replace(/"/g, '')
      process.env[key] = value
    }
  }
}

function config(options = {}) {
  const path = options.path || '.env'
  try {
    const env = fs.readFileSync(path, 'utf8')
    parseEnv(env)
    process.env = { ...process.env, ...options }
  } catch (e) {
    console.error(e)
  }
}

const dotenv = {
  config
}

module.exports = dotenv
