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
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return Ok(await _service.GetAllUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            return Ok(await _service.GetUserById(id));
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
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

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> Put(User user)
        {
            try
            {
                //var oldUser = await _service.GetUserById(user.Id);
                //if (oldUser == null)
                //    return NotFound($"Could not find user with id of {user.Id}");


                var updatedUser = await _service.UpdateAsync(user);
                if (updatedUser != null)
                {
                    return updatedUser;
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