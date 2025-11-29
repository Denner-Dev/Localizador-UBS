using Api.Models;

namespace Api.Services
{
    public class UbsService
    {
        private readonly List<Ubs> _ubs = new List<Ubs>
        {
            new Ubs("UBS Central", "Rua A, 100", -23.55052, -46.63331),
            new Ubs("UBS Norte", "Rua B, 200", -23.50000, -46.62000),
            new Ubs("UBS Sul", "Rua C, 300", -23.60000, -46.65000),
            new Ubs("UBS Leste", "Rua D, 400", -23.56000, -46.58000),
            new Ubs("UBS Oeste", "Rua E, 500", -23.56000, -46.67000)
        };

        private double CalcularDistancia(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371;

            var dLat = (lat2 - lat1) * Math.PI / 180;
            var dLon = (lon2 - lon1) * Math.PI / 180;

            lat1 = lat1 * Math.PI / 180;
            lat2 = lat2 * Math.PI / 180;

            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2) *
                    Math.Cos(lat1) * Math.Cos(lat2);

            var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            return R * c;
        }

        public List<object> ObterUbsOrdenadas(double latUser, double lngUser)
        {
            return _ubs
                .Select((ubs, index) => new 
                {
                    id = index + 1,
                    nome = ubs.Nome,
                    endereco = ubs.Endereco,
                    latitude = ubs.Latitude,
                    longitude = ubs.Longitude,
                    distancia = Math.Round(CalcularDistancia(latUser, lngUser, ubs.Latitude, ubs.Longitude), 2)
                })
                .OrderBy(x => x.distancia)
                .ToList<object>();
        }
    }
}
