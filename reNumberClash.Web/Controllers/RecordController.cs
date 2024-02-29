using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using reNumberClash.Web.Models;

namespace reNumberClash.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardController : ControllerBase
    {
        private readonly List<int> deck = Enumerable.Range(1, 10).SelectMany(x => new[] { x, x }).ToList();

        [HttpGet]
        public ActionResult<IEnumerable<int>> GetDeck()
        {
            return deck;
        }
    }
}
