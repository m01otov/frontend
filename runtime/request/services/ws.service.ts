import { Signal, SignalConnection } from 'typed-signals';

export const WEB_SOCKET_SERVICE_TOKEN = Symbol.for('ws');

type TWSServiceConfig = {
  api: {
    baseUrl: string;
  }
}

type TWSSocketMessageData<T extends object = {}> = {
  type: string;
  payload: T;
}

export interface IWSService {
  connect: (endpoint: string) => IWSServiceSocket;
}

interface IWSServiceSocket {
  send: WebSocket['send'];

  close: WebSocket['close'];

  listen: <T>(messageType: string, callback: (data: T) => void) => SignalConnection;

  onOpen: Signal<(event: Event) => void>;

  onClose: Signal<(event: CloseEvent) => void>;

  onError: Signal<(event: Event) => void>;
}

export const createWSService = (config: TWSServiceConfig): IWSService => {

  const sockets: Map<symbol, IWSServiceSocket> = new Map();

  function _createSocket(url: string): IWSServiceSocket {
    const onOpen = new Signal<(event: Event) => void>();

    const onClose = new Signal<(event: CloseEvent) => void>();

    const onError = new Signal<(event: Event) => void>();

    const signals: Map<string, Signal<(data: unknown) => void>> = new Map();

    function listen<T>(messageType: string, slot: (data: T) => void) {
      let signal: Signal<typeof slot> | undefined = signals.get(messageType);

      if (!signal) {
        signal = new Signal();
        signals.set(messageType, signal);
      }

      return signal.connect(slot);
    }

    function clear() {
      onOpen.disconnectAll();
      onClose.disconnectAll();
      onError.disconnectAll();
      signals.clear();
    }

    const socket = new WebSocket(url);

    socket.onopen = (event: Event) => onOpen.emit(event);

    socket.onmessage = (event: MessageEvent<TWSSocketMessageData>) => {
      const { type, payload } = event.data;

      const signal = signals.get(type);

      if (!signal) return;

      signal.emit(payload);
    }

    socket.onclose = (event: CloseEvent) => {
      onClose.emit(event);
      clear();
    };

    socket.onerror = (event: Event) => {
      onError.emit(event);
      clear();
    }

    return {
      send: socket.send,
      close: socket.close,
      listen,
      onOpen,
      onClose,
      onError
    }
  }

  function connect(endpoint: string) {
    const url = `${config.api.baseUrl}/${endpoint}`;
    const socketKey = Symbol.for(url);
    let socket = sockets.get(socketKey);

    if (!socket) {
      socket = _createSocket(url);
      sockets.set(socketKey, socket);

      socket.onError.connect(() => sockets.delete(socketKey));
      socket.onClose.connect(() => sockets.delete(socketKey));
    }

    return socket;
  }

  return { connect };
}
