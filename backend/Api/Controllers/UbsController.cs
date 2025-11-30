using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Api.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("ubs")]
    public class UbsController : ControllerBase
    {
        private readonly UbsService _service;

        public UbsController(UbsService service)
        {
            _service = service;
        }


        [Authorize]
        [HttpGet("perto")]
        public IActionResult GetPerto([FromQuery] double lat, [FromQuery] double lng)
        {
            var lista = _service.ObterUbsOrdenadas(lat, lng);
            return Ok(lista);
        }
    }
}
