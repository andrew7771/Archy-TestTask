﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserStore.Data;
using UserStore.Models;

namespace UserStore.Services
{
    public class Service : IService
    {
        private readonly UserStoreContext _db;

        public Service(UserStoreContext db)
        {
            _db = db;
        }

        public async Task<UserInfo> CreateAsync(UserInfo user)
        {
            _db.UserInfo.Add(user);
            await _db.SaveChangesAsync();
            return user; 
        }

        public async Task<IEnumerable<UserInfo>> GetAllUsersAsync()
        {
            return await _db.UserInfo.ToListAsync();
        }

        public async Task<UserInfo> GetUserById(int id)
        {
            return await _db.UserInfo.SingleOrDefaultAsync(user => user.Id == id);
        }


    }
}
