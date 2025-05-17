namespace CarsiPazarProjectAPI.Data
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Design;
    using Microsoft.Extensions.Configuration;
    using System.IO;

    namespace CarsiPazarProjectAPI.Data
    {
        public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
        {
            public ApplicationDbContext CreateDbContext(string[] args)
            {
                // config yükle
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory()) // burası önemli
                    .AddJsonFile("appsettings.json")
                    .Build();

                // connection string al
                var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
                var connectionString = configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseSqlServer(connectionString);

                return new ApplicationDbContext(optionsBuilder.Options);
            }
        }
    }

}
