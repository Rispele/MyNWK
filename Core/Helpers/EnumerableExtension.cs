﻿namespace Core.Helpers;

public static class EnumerableExtension
{
    public static void ForEach<TEntity>(
        this IEnumerable<TEntity> enumerable,
        Action<TEntity> action)
    {
        foreach (var item in enumerable)
        {
            action(item);
        }
    }
    
    public static bool IsNullOrEmpty<T>(this IEnumerable<T>? enumerable)
    {
        return enumerable is null || !enumerable.Any();
    }

    public static async Task<byte[]> ReadToEndAsync(
        this Stream stream, 
        int bufferSize,
        CancellationToken? cancellationToken = null)
    {
        var nonNullableCancellationToken = cancellationToken ?? CancellationToken.None;

        var result = new List<byte>(bufferSize);
        var buffer = new byte[bufferSize];
        
        var bytesRead = await stream
            .ReadAsync(buffer, nonNullableCancellationToken)
            .ConfigureAwait(false);
        while (bytesRead > 0)
        {
            result.AddRange(buffer.Take(bytesRead));
            bytesRead = await stream
                .ReadAsync(buffer, nonNullableCancellationToken)
                .ConfigureAwait(false);
        }

        return result.ToArray();
    }
}