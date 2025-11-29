using Api.DTOs;
using Api.Models;
using Api.Repositories;
using Api.Utils;
using BCrypt.Net;

namespace Api.Services
{
    public class UserService
    {
        private readonly UserRepository _repo;
        private readonly JwtService _jwt;

        public UserService(UserRepository repo, JwtService jwt)
        {
            _repo = repo;
            _jwt = jwt;
        }

        public async Task<User> Register(UserCreateDto dto)
        {
            var existingUser = await _repo.GetByEmail(dto.Email);
            if (existingUser != null)
                throw new Exception("Email já está em uso");

            var hash = BCrypt.Net.BCrypt.HashPassword(dto.Senha);

            var user = new User
            {
                Nome = dto.Nome,
                Email = dto.Email.ToLower(),
                SenhaHash = hash,
                Cep = dto.Cep ?? "",
                Endereco = dto.Endereco ?? "",
                Latitude = dto.Latitude,
                Longitude = dto.Longitude
            };

            await _repo.Add(user);
            return user;
        }

        public async Task<string> Login(LoginDto dto)
        {
            var user = await _repo.GetByEmail(dto.Email);
            if (user == null) return null;

            if (!BCrypt.Net.BCrypt.Verify(dto.Senha, user.SenhaHash))
                return null;

            return _jwt.GenerateToken(user);
        }
    }
}
