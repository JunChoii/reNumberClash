using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using reNumberClash.Web.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reNumberClash.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public RecordController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Record
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
        {
            return await _context.Records.ToListAsync();
        }
    }
}
