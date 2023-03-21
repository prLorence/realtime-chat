import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Chat } from 'src/types';

@Injectable()
@WebSocketGateway(3001, {
  cors: 'http://127.0.0.1:5173',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  users = 0;

  handleConnection() {
    this.users++;
    this.server.emit('users', this.users);
  }

  handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chats')
  async onChat(
    @MessageBody() message: Chat,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(message);
    client.emit('chat', message);
  }
}
