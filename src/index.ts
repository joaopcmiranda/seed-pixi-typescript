import { App } from './app/App';

if (!new class { x: any }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

(async () => {
  const app = new App();
  await app.run();
})();
