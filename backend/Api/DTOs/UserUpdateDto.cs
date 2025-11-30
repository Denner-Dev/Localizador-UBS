using System.ComponentModel.DataAnnotations;

namespace Api.DTOs
{
    public class UserUpdateDto
    {


        [Required(ErrorMessage = "Nome completo é obrigatório")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Nome completo deve ter entre 2 e 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "CEP é obrigatório")]
        public string Cep { get; set; } = string.Empty;

        [Required(ErrorMessage = "Endereço é obrigatório")]
        public string Endereco { get; set; } = string.Empty;

        [Required(ErrorMessage = "Latitude é obrigatória")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "Longitude é obrigatória")]
        public double Longitude { get; set; }
    }
}
