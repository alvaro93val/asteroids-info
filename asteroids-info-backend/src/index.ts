import { ServerAsteroids } from './server';

async function main() {
  await new ServerAsteroids().listen();
}

main();
