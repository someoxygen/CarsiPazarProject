using CarsiPazarProjectAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarsiPazarProjectAPI.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            //var totalOrders = _context.Orders.Count();
            //var totalRevenue = _context.Orders.Sum(o => o.TotalPrice);
            var totalProducts = _context.Products.Count();
            var totalUsers = _context.Users.Count();

            return Ok(new
            {
                //totalOrders,
                //totalRevenue,
                totalProducts,
                totalUsers
            });
        }
    }

}
