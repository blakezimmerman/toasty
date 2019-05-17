const NodeRedisPubSub = require("node-redis-pubsub");

const config = {
  port: 6379,
  host: "redis",
  scope: "toasty",
};

const pubSub = new NodeRedisPubSub(config);

const defaultOptions = {
  timeout: 1000,
  pubSub,
  expectsResponse: false,
};

const sendMessage = <T, U>(eventName: string, data: T, options = defaultOptions) => {
  return new Promise<U>((fulfill, reject) => {
    const outgoingEventName = `${eventName}:request`;
    let killswitchTimeoutId: NodeJS.Timeout;

    if (options.expectsResponse) {
      const successEventName = `${eventName}:success`;
      const failedEventName = `${eventName}:failed`;

      const success = options.pubSub.on(successEventName, (response: any) => {
        fulfill(response);
        endMessageLifeCycle();
      });

      const error = options.pubSub.on(failedEventName, (response: any) => {
        reject(response);
        endMessageLifeCycle();
      });

      const shutoffEvents = [success, error];

      const endMessageLifeCycle = () => {
        shutoffEvents.forEach((shutOff) => {
          shutOff();
        });
        clearTimeout(killswitchTimeoutId);
      };

      if (options.timeout >= 0) {
        killswitchTimeoutId = setTimeout(() => {
          reject(new Error("timed out"));
          endMessageLifeCycle();
        }, options.timeout);
      }
    }

    options.pubSub.emit(outgoingEventName, data);

    if (!options.expectsResponse) {
      fulfill();
    }
  });
};

export { pubSub, sendMessage };
