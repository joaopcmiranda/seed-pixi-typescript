import { Application, Ticker } from 'pixi.js';
import './App.scss';
import { ResourceManager } from './ResourceManager';
import { MainScene } from '../scenes/MainScene';
import { update } from '@tweenjs/tween.js';

export class App extends Application {

  constructor() {
    super({
      resizeTo: window,
      backgroundColor: 0x1099bb,
      sharedTicker: true,
      sharedLoader: true,
    });
    document.body.appendChild(this.view);
  }

  async run() {
    const rm = ResourceManager.getInstance();
    await rm.preload();

    const ticker = Ticker.shared;

    const scene = new MainScene();
    this.stage.addChild(scene.container);

    // animate hero each "tick": go left or right continuously
    ticker.add(() => {
      update();
    });
  }
}
