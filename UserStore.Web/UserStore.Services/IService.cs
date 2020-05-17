using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserStore.Models;

namespace UserStore.Services
{
    public interface IService
    {
        Task<IEnumerable<UserInfo>> GetAllUsersAsync();
        Task<UserInfo> GetUserById(int id);
        Task<UserInfo> CreateAsync(UserInfo user);

    }
}
