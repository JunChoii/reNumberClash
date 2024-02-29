using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace reNumberClash.Hubs
{
    public class GameHub : Hub
    {
        public override Task OnConnectedAsync()
        {
            // Logic to handle when a client connects to the hub
            return base.OnConnectedAsync();
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            // Logic to handle when a client disconnects from the hub
            return base.OnDisconnectedAsync(exception);
        }
    }
}
