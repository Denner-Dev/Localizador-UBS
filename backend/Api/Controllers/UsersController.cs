using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Repositories;
using Api.DTOs;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _repo;

        public UsersController(UserRepository repo)
        {
            _repo = repo;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _repo.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _repo.GetById(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UserUpdateDto dto)
        {
            var user = await _repo.GetById(id);
            if (user == null) return NotFound();

            user.Nome = dto.Nome;
            user.Cep = dto.Cep;
            user.Endereco = dto.Endereco;
            user.Latitude = dto.Latitude;
            user.Longitude = dto.Longitude;

            await _repo.Update(user);
            return Ok(user);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _repo.GetById(id);
            if (user == null) return NotFound();

            await _repo.Delete(user);
            return NoContent();
        }
    }
}
