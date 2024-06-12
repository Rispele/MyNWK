using Core.Objects;
using Core.Objects.Markets;
using Core.Objects.MyNwkUnitOfWork;
using Core.Objects.Products;
using Core.Services.Orders;
using Core.Services.Products;
using Core.Objects.Users;
using Microsoft.EntityFrameworkCore;
using Core.BlobStorage;
using Npgsql;

namespace TestsCore.Repositories;

[TestFixture]
public class UnitOfWork_Test
{
    private readonly UnitOfWork unitOfWork;
    private readonly UnitOfWorkProvider unitOfWorkProvider;
    private readonly IBlobStorageClient client;
    
    public UnitOfWork_Test()
    {
        
    }

    [Test]
    public async Task T()
    {
        var host       = "rc1b-4wtfkm4pdxky8dd8.mdb.yandexcloud.net";
        var port       = "6432";
        var db         = "db1";
        var username   = "my-nwk-user";
        var password   = "kn8i6S9WHAqycEH";
        var connString = $"Host={host};Port={port};Database={db};Username={username};Password={password};Ssl Mode=VerifyFull;";

        await using var conn = new NpgsqlConnection(connString);
        await conn.OpenAsync();

        await using (var cmd = new NpgsqlCommand("SELECT VERSION();", conn))
        await using (var reader = await cmd.ExecuteReaderAsync())
        {
            while (await reader.ReadAsync())
            {
                Console.WriteLine(reader.GetInt32(0));
            }
        }
    }
    
    [Test]
    public async Task Test()
    {
        var user = new User
        {
            TelegramId = 123,
            TelegramUsername = "123"
        };
        unitOfWork.UsersRepository.Create(user);
        Console.WriteLine(user.Id);
        await unitOfWork.CommitAsync(CancellationToken.None);
        user.Name = "хуй";
        await unitOfWork.CommitAsync(CancellationToken.None);
        Console.WriteLine(user.Id);
        await unitOfWork.CommitAsync(CancellationToken.None);
        var market = new Market()
        {
            OwnerId = user.Id,
            MarketInfo = new MarketInfo(),
            Name = "123",
            Products = new List<Product>()
            {
                new()
                {
                    Title = "хуй",
                    CreatedAt = DateTime.UtcNow,
                    Price = 1,
                    Remained = 2
                    // CreatedAt = PreciseTimestampGenerator
                }
            }
        };
        unitOfWork.MarketsRepository.Create(market);
        await unitOfWork.CommitAsync(CancellationToken.None);
        
        Console.WriteLine(market.Id);
        Console.WriteLine(user.Id);
    }
    [Test]
    public async Task TestCli()
    {
        var y = new ProductService(unitOfWorkProvider, client);
        
        var x = await y.GetOrderProductsAsync(new Core.RequestContext(){ UserId = 1212, CancellationToken = CancellationToken.None }, new Guid());

    }
}