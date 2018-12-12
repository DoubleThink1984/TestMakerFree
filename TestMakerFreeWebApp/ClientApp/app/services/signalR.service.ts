import { Injectable, EventEmitter, Inject } from "@angular/core";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";


@Injectable()
export class SignalRService {
    
    messageReceived = new EventEmitter<ChatMessage>();
    connectionEstablished = new EventEmitter<boolean>();

    private connectionIsEstablished = false;
    private _hubConnection: HubConnection;

    constructor(
        @Inject('BASE_URL') private baseUrl: string
    ) {
        this.createConnection();
        this.registerOnServerEvents();
        this.startConnection();
    }

    sendChatMessage(message: ChatMessage) {
        this._hubConnection.invoke('SendMessage', message);
    }  

    createConnection() {
        this._hubConnection = new HubConnectionBuilder()
            .withUrl(this.baseUrl + 'chathub')
            .build();
    }

    registerOnServerEvents(): void {
        this._hubConnection.on('ReceiveMessage', (data: any) =>
        {
            this.messageReceived.emit(data);
        });
    }

    startConnection(): void {
        this._hubConnection
            .start()
            .then(() => {
                this.connectionIsEstablished = true;
                console.log('Hub connection started');
                this.connectionEstablished.emit(true);
            })
            .catch(err => {
                console.log('Error while establishing connection, retrying...');
    
            });
    }
}

export class ChatMessage {

    user: string;
    message: string;
    room: string;

    constructor(user: string = '', message: string = '', room: string = '') {
        this.user = user;
        this.message = message;
        this.room = room;
    }
}  