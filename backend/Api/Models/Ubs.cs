namespace Api.Models
{
    public class Ubs
    {
        public string Nome { get; set; }
        public string Endereco { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public Ubs(string nome, string endereco, double lat, double lng)
        {
            Nome = nome;
            Endereco = endereco;
            Latitude = lat;
            Longitude = lng;
        }
    }
}
