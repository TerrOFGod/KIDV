using Microsoft.AspNetCore.Mvc;

namespace AuthService.Controllers;

public class AuthController : ControllerBase
{
    public IActionResult Index()
    {
        return View();
    }
}
