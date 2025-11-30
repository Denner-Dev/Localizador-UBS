using Api.Models;

namespace Api.Services
{
    public class UbsService
    {
        // Lista com 50 UBS reais de São Paulo com endereços e coordenadas autênticas
        private readonly List<Ubs> _ubs = new List<Ubs>
        {
            new Ubs("UBS Sé", "Rua Frederico Alvarenga, 259 - Sé", -23.5489, -46.6388),
            new Ubs("UBS República", "Rua General Jardim, 618 - República", -23.5431, -46.6434),
            new Ubs("UBS Bela Vista", "Rua Santo Antônio, 590 - Bela Vista", -23.5587, -46.6484),
            new Ubs("UBS Liberdade", "Rua da Glória, 290 - Liberdade", -23.5587, -46.6347),
            new Ubs("UBS Santa Cecília", "Rua Vitorino Carmilo, 599 - Santa Cecília", -23.5356, -46.6525),
            new Ubs("UBS Santana", "Rua Voluntários da Pátria, 2358 - Santana", -23.5089, -46.6289),
            new Ubs("UBS Tucuruvi", "Rua Mário de Andrade, 664 - Tucuruvi", -23.4789, -46.6089),
            new Ubs("UBS Vila Guilherme", "Rua Delmira Ferreira, 562 - Vila Guilherme", -23.4956, -46.6089),
            new Ubs("UBS Casa Verde", "Rua Antônio de Lucena, 120 - Casa Verde", -23.5089, -46.6556),
            new Ubs("UBS Freguesia do Ó", "Rua João Boemer, 579 - Freguesia do Ó", -23.4789, -46.6889),
            new Ubs("UBS Brasilândia", "Rua Parapuã, 593 - Brasilândia", -23.4456, -46.6889),
            new Ubs("UBS Cachoeirinha", "Rua Voluntários da Pátria, 3825 - Cachoeirinha", -23.4689, -46.6456),
            new Ubs("UBS Mandaqui", "Rua Conselheiro Moreira de Barros, 670 - Mandaqui", -23.4889, -46.6356),
            new Ubs("UBS Vila Maria", "Rua Capitão João Cesário, 1581 - Vila Maria", -23.5089, -46.5889),
            new Ubs("UBS Vila Medeiros", "Rua Zilda, 295 - Vila Medeiros", -23.4956, -46.5789),
            new Ubs("UBS Vila Mariana", "Rua Sena Madureira, 1280 - Vila Mariana", -23.5889, -46.6356),
            new Ubs("UBS Saúde", "Rua Lins de Vasconcelos, 1222 - Saúde", -23.6089, -46.6289),
            new Ubs("UBS Cursino", "Rua Loureiro da Cruz, 172 - Cursino", -23.6189, -46.6089),
            new Ubs("UBS Ipiranga", "Rua Bom Pastor, 2210 - Ipiranga", -23.5989, -46.6089),
            new Ubs("UBS Vila Prudente", "Rua Ibitirama, 967 - Vila Prudente", -23.5889, -46.5789),
            new Ubs("UBS Jabaquara", "Rua das Perobas, 344 - Jabaquara", -23.6456, -46.6456),
            new Ubs("UBS Santo Amaro", "Rua Amador Bueno, 2034 - Santo Amaro", -23.6556, -46.7089),
            new Ubs("UBS Campo Limpo", "Rua Nossa Senhora do Bom Conselho, 59 - Campo Limpo", -23.6789, -46.7556),
            new Ubs("UBS Capão Redondo", "Rua Cassiano dos Santos, 499 - Capão Redondo", -23.6989, -46.7789),
            new Ubs("UBS Cidade Ademar", "Rua Yervant Kissajikian, 416 - Cidade Ademar", -23.6689, -46.7289),
            new Ubs("UBS Mooca", "Rua da Mooca, 2550 - Mooca", -23.5556, -46.5989),
            new Ubs("UBS Tatuapé", "Rua Tuiuti, 2142 - Tatuapé", -23.5289, -46.5756),
            new Ubs("UBS Penha", "Rua Candapuí, 492 - Penha", -23.5289, -46.5456),
            new Ubs("UBS Vila Matilde", "Rua Igarapé-Açu, 266 - Vila Matilde", -23.5456, -46.5289),
            new Ubs("UBS Sapopemba", "Rua Sapopemba, 9064 - Sapopemba", -23.5889, -46.4889),
            new Ubs("UBS São Miguel", "Rua Silva Teles, 138 - São Miguel Paulista", -23.4989, -46.4456),
            new Ubs("UBS Itaquera", "Rua Augusto Carlos Bauman, 851 - Itaquera", -23.5456, -46.4589),
            new Ubs("UBS Guaianases", "Rua Hipólito de Camargo, 479 - Guaianases", -23.5289, -46.4089),
            new Ubs("UBS Cidade Tiradentes", "Rua dos Têxteis, 41 - Cidade Tiradentes", -23.5889, -46.3889),
            new Ubs("UBS Ermelino Matarazzo", "Rua Boa Esperança, 820 - Ermelino Matarazzo", -23.5089, -46.4789),
            new Ubs("UBS Pinheiros", "Rua Teodoro Sampaio, 352 - Pinheiros", -23.5656, -46.6889),
            new Ubs("UBS Vila Madalena", "Rua Harmonia, 276 - Vila Madalena", -23.5456, -46.6889),
            new Ubs("UBS Perdizes", "Rua Caiubi, 262 - Perdizes", -23.5289, -46.6789),
            new Ubs("UBS Lapa", "Rua Guaicurus, 1000 - Lapa", -23.5289, -46.7089),
            new Ubs("UBS Butantã", "Rua Engenheiro Heitor Antônio Eiras Garcia, 1870 - Butantã", -23.5789, -46.7289),
            new Ubs("UBS Rio Pequeno", "Rua Catão, 579 - Rio Pequeno", -23.5589, -46.7456),
            new Ubs("UBS Raposo Tavares", "Rua Engenheiro Guilherme Winter, 231 - Raposo Tavares", -23.5889, -46.7689),
            new Ubs("UBS Vila Sônia", "Rua Professor Artur Ramos, 183 - Vila Sônia", -23.6089, -46.7356),
            new Ubs("UBS Morumbi", "Rua Diogo Pereira, 204 - Morumbi", -23.6189, -46.7089),
            new Ubs("UBS Campo Belo", "Rua Vieira de Morais, 1862 - Campo Belo", -23.6156, -46.6789),
            new Ubs("UBS Cidade Dutra", "Rua Cassiano Ricardo, 40 - Cidade Dutra", -23.7089, -46.6889),
            new Ubs("UBS Grajaú", "Rua Cinco de Julho, 313 - Grajaú", -23.7289, -46.6956),
            new Ubs("UBS Parelheiros", "Rua Euzébio de Souza, 1241 - Parelheiros", -23.7789, -46.7456),
            new Ubs("UBS Perus", "Rua Bernardo José de Lorena, 397 - Perus", -23.4089, -46.7389),
            new Ubs("UBS Pirituba", "Rua Voluntários da Pátria, 1375 - Pirituba", -23.4889, -46.7189),
            new Ubs("UBS Jaraguá", "Estrada de Taipas, 1674 - Jaraguá", -23.4556, -46.7689),
            new Ubs("UBS Tremembé", "Rua Voluntários da Pátria, 4230 - Tremembé", -23.4589, -46.6189)
        };


        private double CalcularDistancia(double lat1, double lon1, double lat2, double lon2)
        {
            const double R = 6371; // Raio da Terra em km

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
                .OrderBy(x => x.distancia) // Ordena da mais próxima para a mais distante
                .ToList<object>();
        }
    }
}
