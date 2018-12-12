import { Component, NgZone } from "@angular/core";
import { SignalRService } from "../../services/signalR.service";

@Component({
    selector: "singalR-chat",
    templateUrl: "./signal.component.html",
    styleUrls: ['./signalR-chat.component.css']
})

export class SignalRChatComponent {
    chatMessage: ChatMessage;
    canSendMessage: boolean;
    tabs: Tab[];  
    currentRoom: string;

    constructor(
        private signalrService: SignalRService,
        private _ngZone: NgZone
    )
    {
        this.subscribeToEvents();
        this.chatMessage = new ChatMessage();
        this.tabs = [];
        this.tabs.push(new Tab('Lobby', 'Welcome to lobby'));
        this.tabs.push(new Tab('SignalR', 'Welcome to SignalR Room'));
        this.currentRoom = 'Lobby'; 
    }

    sendMessage() {
        //if (this.canSendMessage) {
        //    this.chatMessage.room = this.currentRoom;
        //    this.signalrService.sendChatMessage(this.chatMessage);
        //}
    }

    OnRoomChange(room: string) {
        this.currentRoom = room;
    } 

    private subscribeToEvents(): void {
        //this.signalrService.connectionEstablished.subscribe(() => {
        //    this.canSendMessage = true;
        //});

        //this.signalrService.messageReceived.subscribe((message: ChatMessage) => {
        //    this._ngZone.run(() => {
        //        this.chatMessage = new ChatMessage();
        //        let room = this.tabs.find(t => t.heading == message.room);
        //        if (room) {
        //            room.messageHistory.push(new ChatMessage(message.user, message.message, message.room));
        //        }
        //    });
        //});
    }  



}

//import { ChatMessage } from '../Models/chatmessage.model';

/** Represent Tab class */
export class Tab {
    messageHistory: ChatMessage[];
    heading: string;
    title: string;

    constructor(
        heading: string = '',
        title: string = ''
    ) {
        this.heading = heading;
        this.title = title;
        this.messageHistory = [];
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