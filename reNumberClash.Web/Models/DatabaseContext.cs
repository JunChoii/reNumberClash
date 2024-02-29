using Microsoft.EntityFrameworkCore;

namespace reNumberClash.Web.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Record> Records { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
