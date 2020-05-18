using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserStore.Models;

namespace UserStore.Data
{
    public class UserStoreContext: DbContext
    {
        private readonly IConfiguration _config;

        public UserStoreContext()
        {

        }

        public UserStoreContext(DbContextOptions<UserStoreContext> options, IConfiguration config)
            : base(options)
        {
            _config = config;
            Database.EnsureCreated();
        }

        public virtual DbSet<User> UserInfo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("UserStoreConnectionString"), opt => opt.MigrationsAssembly("UserStoreStore.Data"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity => entity.HasData(new User
            {
                Id = 1,
                BirthDate = new DateTime(1996, 5, 8),
                Email = "atur@ec.com",
                FirstName = "Andrii",
                LastName = "Turianskyi"
            }));
        }

    }
}
