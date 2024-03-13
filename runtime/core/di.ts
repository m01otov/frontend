import { Container } from 'inversify';

export const diContainer = new Container();

export function inject<T>(consumer: Function, dependencies: symbol[]): (...args: any[]) => T {
  let injections = dependencies.map((dependency) => {
      return diContainer.get(dependency);
  });

  return consumer.bind(consumer, ...injections)
}
