import * as feathers from 'feathers';

declare module 'feathers' {
  interface Application {
    hooks(hooks: hooks.HooksObject): Application;
  }

  interface Service<T extends any> {
    before(hooks: hooks.HookMap): Application;
    after(hooks: hooks.HookMap): Application;
    hooks(hooks: hooks.HooksObject): Application;
  }
}

declare function hooks(): () => void;

declare namespace hooks {
  interface Hook {
    <T>(hook: HookProps<T>): Promise<any> | void;
  }

  interface HookProps<T> {
    app?: feathers.Application;
    data?: T;
    error?: any;
    id?: string | number;
    method?: string;
    params?: any;
    path?: string;
    result?: T;
    service: feathers.Service<T>;
    type: 'before' | 'after' | 'error';
  }

  interface HookMap {
    all?: Hook | Hook[];
    find?: Hook | Hook[];
    get?: Hook | Hook[];
    create?: Hook | Hook[];
    update?: Hook | Hook[];
    patch?: Hook | Hook[];
    remove?: Hook | Hook[];
  }

  interface HooksObject {
    before?: HookMap;
    after?: HookMap;
    error?: HookMap;
  }
}

export = hooks;
