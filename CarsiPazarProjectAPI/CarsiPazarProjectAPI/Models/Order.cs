namespace CarsiPazarProjectAPI.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();

        public decimal TotalPrice { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Beklemede;
    }


}
