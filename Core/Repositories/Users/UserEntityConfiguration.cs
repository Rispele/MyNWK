﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Repositories.Users;

public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
{
    public void Configure(EntityTypeBuilder<UserEntity> builder)
    {
        builder.ToTable("users");
        builder.HasKey(t => t.Id);
        
        builder
            .Property(t => t.Id)
            .ValueGeneratedOnAdd();

        builder
            .Property(t => t.TelegramId)
            .IsRequired();

        builder
            .Property(t => t.Name)
            .HasColumnType("varchar(64)");

        builder
            .Property(t => t.PhoneNumber)
            .HasColumnType("varchar(16)");

        builder.HasIndex(t => new
        {
            t.TelegramId
        });
    }
}