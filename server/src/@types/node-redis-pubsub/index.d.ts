// @types/node-redis-pubsub is out of date so I made this
declare module "node-redis-pubsub" {
  class NodeRedisPubSub {
    constructor(options: object);
    on<T = any>(
      channel: string,
      handler: (data: T, channel: string) => void,
      callback?: () => void
    ): () => void;
    subscribe<T = any>(
      channel: string,
      handler: (data: T, channel: string) => void,
      callback?: () => void
    ): () => void;
    emit<T = any>(channel: string, message: T): void;
    publish<T = any>(channel: string, message: T): void;
    quit(): void;
    end(): void;
  }

  export = NodeRedisPubSub;
}
