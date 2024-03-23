import path from 'path';
import IConfig from '../interfaces/IConfig';
import fs from 'fs';

let configPath = '';

try {
  configPath = path.join(process.cwd(), 'appConfig.json');
  if (!fs.existsSync(configPath)) configPath = '';

} catch (_) {
  configPath = '';
  console.log('Project not builded');
}

const RESOURCES_PATH = configPath
  ? path.join(configPath)
  : path.join(__dirname, '../../appConfig.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: IConfig = require(RESOURCES_PATH);

export default config;