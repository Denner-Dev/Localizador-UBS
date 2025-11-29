namespace Api.DTOs
{
    public class UserUpdateDto
    {
        public string Nome { get; set; }
        public string Cep { get; set; }
        public string Endereco { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
