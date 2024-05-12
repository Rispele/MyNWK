using Core.Services.Products;

namespace Core.Services.Orders;

public class FullOrder
{
    public Guid OrderId { get; set; }
    public List<ProductDto> Products { get; set; } = null!;
    public bool ReceivedByBuyer { get; set; }
    public bool CanceledBySeller { get; set; }
}