using Microsoft.AspNetCore.Mvc;
using Api.Services;
using Api.DTOs;

namespace Api.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _service;

        public AuthController(UserService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateDto dto)
        {
            try
            {
                var user = await _service.Register(dto);
                return Ok(new { message = "Usuário cadastrado com sucesso", userId = user.Id });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                var token = await _service.Login(dto);

                if (token == null)
                    return Unauthorized(new { message = "Email ou senha inválidos" });

                return Ok(new { token });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Erro interno no servidor" });
            }
        }
    }
}
