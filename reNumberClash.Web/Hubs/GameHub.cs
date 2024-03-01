using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;


namespace reNumberClash.Hubs
{
    public class GameHub : Hub
    {

        public async Task SendUsername(string username)
        {
            Console.WriteLine($"Received username: {username}");
        }
        private static readonly List<string> ConnectedUsers = new List<string>();

        public override Task OnConnectedAsync()
        {
            string connectionId = Context.ConnectionId;
            ConnectedUsers.Add(connectionId);

            Console.WriteLine("Connected: " + connectionId);
            Console.WriteLine("Total connected users: " + ConnectedUsers.Count);
            

            return base.OnConnectedAsync();
        }
        

        

        

        
    }
}
