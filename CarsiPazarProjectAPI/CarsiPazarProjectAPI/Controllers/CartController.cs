using CarsiPazarProjectAPI.Data;
using CarsiPazarProjectAPI.DTOs;
using CarsiPazarProjectAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CarsiPazarProjectAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        }

        // Kullanıcının sepetini getir
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();

            var cart = await _context.Carts
                .Include(c => c.Items)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
                return Ok(new Cart { UserId = userId, Items = new List<CartItem>() });

            return Ok(cart);
        }

        // Sepete ürün ekle
        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartRequest request)
        {
            var userId = GetUserId();

            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }

            var existingItem = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
            if (existingItem != null)
            {
                existingItem.Quantity += request.Quantity;
            }
            else
            {
                var newItem = new CartItem
                {
                    ProductId = request.ProductId,
                    Quantity = request.Quantity,
                    CartId = cart.Id
                };
                _context.CartItems.Add(newItem);
            }

            await _context.SaveChangesAsync();
            return Ok();
        }


        // Miktar güncelle
        [HttpPut("update/{itemId}")]
        public async Task<IActionResult> UpdateQuantity(int itemId, [FromBody] int quantity)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(i => i.Id == itemId);
            if (item == null) return NotFound();

            item.Quantity = quantity;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // Ürün sil
        [HttpDelete("remove/{itemId}")]
        public async Task<IActionResult> RemoveItem(int itemId)
        {
            var item = await _context.CartItems.FirstOrDefaultAsync(i => i.Id == itemId);
            if (item == null) return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // Sepeti temizle
        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();

            var cart = await _context.Carts
                .Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null) return NotFound();

            _context.CartItems.RemoveRange(cart.Items);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
