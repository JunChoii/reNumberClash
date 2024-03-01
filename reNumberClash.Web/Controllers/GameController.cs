using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using reNumberClash.Web.Models;
using System.Threading.Tasks;
using reNumberClash.Hubs;

namespace reNumberClash.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IHubContext<GameHub> _hubContext;

        public GameController(DatabaseContext context, IHubContext<GameHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpGet]
            public async Task<ActionResult<IEnumerable<string>>> GetFooItems()
            {
                return new List<string> { "foo", "bar", "baz" };
            }
        

        [HttpPost]
        public async Task<ActionResult<string>> CompareCards(UserCards userCards)
        {
            var userCombination = CalculateCombination(userCards.UserCard1, userCards.UserCard2);

            await _hubContext.Clients.All.SendAsync("ReceiveUserCards", userCards);

            return Ok(userCombination);
        }

        private string CalculateCombination(int card1, int card2)
        {
            if (card1 == card2)
            {
                return (card1 * card2).ToString();
            }
            else
            {
                var sum = (card1 + card2) % 10;
                return sum.ToString();
            }
        }
    }

    public class UserCards
    {
        public int UserCard1 { get; set; }
        public int UserCard2 { get; set; }
    }
}
