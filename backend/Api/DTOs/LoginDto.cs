using System.ComponentModel.DataAnnotations;

namespace Api.DTOs
{
    public class LoginDto
    {
        [Required(ErrorMessage = "E-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail deve ter um formato válido")]
        [StringLength(50, ErrorMessage = "E-mail deve ter no máximo 50 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Senha deve ter entre 6 e 100 caracteres")]
        public string Senha { get; set; } = string.Empty;
    }
}
