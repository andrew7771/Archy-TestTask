using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using UserStore.Models;
using UserStore.Services;

namespace UserStore.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IService _service;
        private readonly LinkGenerator _linkGenerator;
        public UsersController(IService service, LinkGenerator linkGenerator)
        {
            _service = service;
            _linkGenerator = linkGenerator;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserInfo>>> Get()
        {
            return Ok(await _service.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserInfo>> Get(int id)
        {
            return Ok(await _service.GetUserById(id));
        }

        [HttpPost]
        public async Task<ActionResult<UserInfo>> Post(UserInfo user)
        {
            try
            {
                var existing = await _service.GetUserById(user.Id);
                if (existing != null)
                {
                    return BadRequest("User already exists");
                }

                var createdUser = await _service.CreateAsync(user);
                if (createdUser != null)
                {
                    var location = _linkGenerator.GetPathByAction("Get", "Users", new { user = createdUser.Id });

                    if (string.IsNullOrWhiteSpace(location))
                    {
                        return BadRequest("Could not use current user");
                    }

                    return Created(location, createdUser);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong on the server");
            }

            return BadRequest();
        }

    }
}