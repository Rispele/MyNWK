﻿using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Core.Repositories.Markets;

public class MarketContext : MyNwkDbContextBase<MarketContext>
{
    [UsedImplicitly]
    public DbSet<MarketEntity> Markets { get; } = null!;

    public MarketContext(DbContextOptions<MarketContext> options) 
        : base(options)
    {
    }
}