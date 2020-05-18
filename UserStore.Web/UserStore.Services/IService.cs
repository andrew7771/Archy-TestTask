using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserStore.Models;

namespace UserStore.Services
{
    public interface IService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserById(int id);
        Task<User> CreateAsync(User user);
        Task<User> UpdateAsync(User user);

    }
}
