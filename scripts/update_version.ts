import fs from 'fs'

const packageJson = JSON.parse(fs.readFileSync('./package.json').toString())

const tauriConfig = JSON.parse(fs.readFileSync('./src-tauri/tauri.conf.json').toString())

const { version } = packageJson

// eslint-disable-next-line functional/immutable-data
tauriConfig.package.version = version

fs.writeFileSync('./src-tauri/tauri.conf.json', JSON.stringify(tauriConfig, null, 4))
