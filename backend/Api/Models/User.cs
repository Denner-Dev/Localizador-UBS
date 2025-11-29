namespace Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string SenhaHash { get; set; }

        public string Cep { get; set; }
        public string Endereco { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
