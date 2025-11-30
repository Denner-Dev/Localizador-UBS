using System.ComponentModel.DataAnnotations;

namespace Api.DTOs
{
    public class UserCreateDto
    {
        [Required(ErrorMessage = "Nome completo é obrigatório")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nome completo deve ter entre 2 e 100 caracteres")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "E-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail deve ter um formato válido")]
        [StringLength(50, ErrorMessage = "E-mail deve ter no máximo 50 caracteres")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatória")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Senha deve ter entre 6 e 100 caracteres")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "CEP é obrigatório")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "Endereço é obrigatório")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "Latitude é obrigatória")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "Longitude é obrigatória")]
        public double Longitude { get; set; }
    }
}
