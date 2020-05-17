using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserStore.Data;
using UserStore.Services;

namespace UserStore.Infrastructure
{
    public static class ServicesConfigurator
    {
        public static void AddProjectConfiguration(this IServiceCollection services)
        {
            services.AddDbContext<UserStoreContext>();
            services.AddScoped<IService, Service>();
        }
    }
}
