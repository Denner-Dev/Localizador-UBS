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

        /// Registra um novo usuário no sistema
        public async Task<User> Register(UserCreateDto dto)
        {
            // Verifica se email já existe
            var existingUser = await _repo.GetByEmail(dto.Email);
            if (existingUser != null)
                throw new Exception("Email já está em uso");

            // Criptografa a senha usando BCrypt
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

        /// Autentica usuário e gera token JWT
        public async Task<string?> Login(LoginDto dto)
        {
            var user = await _repo.GetByEmail(dto.Email);
            if (user == null) return null;

            // Verifica senha usando BCrypt
            if (!BCrypt.Net.BCrypt.Verify(dto.Senha, user.SenhaHash))
                return null;

            // Gera token JWT para autenticação
            return _jwt.GenerateToken(user);
        }


        /// Busca usuário por email (usado para obter coordenadas)
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _repo.GetByEmail(email);
        }

        ///Lista todos os usuários
        public async Task<List<User>> GetAll()
        {
            return await _repo.GetAll();
        }
        /// Atualiza os dados do usuário
        public async Task<User?> Update(int id, UserUpdateDto dto)
        {
            var user = await _repo.GetById(id);
            if (user == null) return null;

            // Atualiza os dados do usuário
            user.Nome = dto.Nome;
            user.Cep = dto.Cep;
            user.Endereco = dto.Endereco;
            user.Latitude = dto.Latitude;
            user.Longitude = dto.Longitude;

            await _repo.Update(user);
            return user;
        }
        /// Deleta usuário
        public async Task<bool> Delete(int id)
        {
            var user = await _repo.GetById(id);
            if (user == null) return false;

            await _repo.Delete(user);
            return true;
        }
    }
}
