import { Loader as PixiLoader, LoaderResource } from 'pixi.js';
import { ResourceMap } from './ResourceMap';
import type { Dict } from '@pixi/utils';

class StaticResourceManager {
  private static _loader: PixiLoader;
  private static _instance: ResourceManager;

  public static getInstance(): ResourceManager {
    if (!this._loader) {
      this._loader = PixiLoader.shared;
    }

    if (!ResourceManager._instance) {
      ResourceManager._instance = new ResourceManager(this._loader);
    }

    return ResourceManager._instance;
  }
}

export class ResourceManager extends StaticResourceManager {

  public resources: Dict<LoaderResource> = {};

  private loader: PixiLoader;

  constructor(loader: PixiLoader) {
    super();
    this.loader = loader;
  }

  preload() {
    return new Promise<void>(resolve => {
      Object.entries(ResourceMap).map(([key, asset]) => {
        console.log(`Loading resource: ${key}`);
        this.loader.add(key, asset);
        console.log(`Loaded resource: ${key}`);
      });

      this.loader.load((_, resources) => {
        this.resources = resources;
        console.log('Loaded all resources');
        resolve();
      });
    });
  }
}
