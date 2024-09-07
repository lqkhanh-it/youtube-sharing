const WEBSOCKET_URL = import.meta.env.VITE_WEB_SOCKET;

export enum WSMessageType {
  NOTIFICATION = 'NOTIFICATION',
  VIDEO_UPDATE = 'VIDEO_UPDATE',
  RESPONSE = 'RESPONSE',
}

class WebSocketHelper {
  private websocket: WebSocket | null = null;

  private url: string = WEBSOCKET_URL;

  private reconnectDelay: number = 1000;

  private reconnectAttempts: number = 0;

  private maxReconnectAttempts: number = 10;

  public connect(onMessage: (message: MessageEvent) => void, onError?: (error: Event) => void) {
    if (this.websocket) {
      console.warn('WebSocket is already connected');
      return;
    }

    const storage = localStorage.getItem('user');
    let token = '';
    if (storage) {
      token = JSON.parse(storage)?.tokens?.accessToken;
    }

    this.websocket = new WebSocket(`${this.url}?token=${encodeURIComponent(token)}`);

    this.websocket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.websocket.onmessage = (message: MessageEvent) => {
      console.log('WebSocket message received:', message.data);
      onMessage(message);
    };

    this.websocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
      this.websocket = null;

      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        console.log(`Reconnecting for ${this.reconnectAttempts} times`);
        setTimeout(
          () => {
            this.reconnectAttempts += 1;
            this.connect(onMessage, onError);
          },
          (this.reconnectAttempts + Math.random()) * this.reconnectDelay,
        );
      } else {
        console.error('Max reconnection attempts reached!');
      }
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    };
  }

  public sendMessage(message: string) {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
      console.log('WebSocket message sent:', message);
    } else {
      console.warn('Cannot send message, WebSocket is not open');
      throw new Error('Cannot send message, WebSocket is not open');
    }
  }

  public close() {
    if (this.websocket) {
      this.websocket.close();
      console.log('WebSocket connection closed by client');
    }
  }

  public isConnected(): boolean {
    return this.websocket !== null && this.websocket.readyState === WebSocket.OPEN;
  }
}

export default new WebSocketHelper();
