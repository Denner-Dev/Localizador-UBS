using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Services;
using Api.DTOs;
using System.Security.Claims;

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
            // Validação dos campos obrigatórios
            if (!ModelState.IsValid)
            {
                var errors = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .Select(x => x.Value.Errors.First().ErrorMessage)
                    .ToList();
                
                return BadRequest(new { message = "Campos obrigatórios:", errors });
            }

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


        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            try
            {
                // Extrai email do token JWT
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                    return Unauthorized(new { message = "Token inválido" });

                var user = await _service.GetUserByEmail(userEmail);
                if (user == null)
                    return NotFound(new { message = "Usuário não encontrado" });

                // Retorna dados do usuário (incluindo coordenadas para cálculo de distância)
                return Ok(new 
                {
                    id = user.Id,
                    nome = user.Nome,
                    email = user.Email,
                    latitude = user.Latitude,
                    longitude = user.Longitude
                });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Erro interno no servidor" });
            }
        }
    }
}
