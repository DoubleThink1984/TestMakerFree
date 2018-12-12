using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestMakerFreeWebApp.Data.Models
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }

    public class ChatMessage
    {
        public ChatMessage(string user, string message, string room)
        {
            User = user;
            Message = message;
            Room = room;
        }

        public string User { get; set; }
        public string Message { get; set; }
        public string Room { get; set; }
    }
}
