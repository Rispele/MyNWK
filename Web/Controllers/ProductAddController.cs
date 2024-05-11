﻿using System.Globalization;
using Core.Helpers;
using Core.Objects.MyNwkUnitOfWork;
using Core.Objects.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web.Models.ViewComponents;

namespace Web.Areas.User.Controllers;

[Authorize(Policy = "UserPolicy")]
public class ProductAddController : Controller
{
    private readonly IUnitOfWorkProvider unitOfWorkProvider;
    
    public ProductAddController(IUnitOfWorkProvider unitOfWorkProvider)
    {
        this.unitOfWorkProvider = unitOfWorkProvider;
    }
    
    [HttpGet]
    public IActionResult Index(string returnUrl)
    {
        ViewBag.returnUrl = "/";
        return View("~/Views/ProductAdd/ProductAdd.cshtml");
    }

    [HttpPost]
    public async Task<IActionResult> Index(ProductAddModel model, string returnUrl)
    {
        if (!ModelState.IsValid) 
            return View("~/Views/ProductAdd/ProductAdd.cshtml", model);
        await using var unitOfWork = unitOfWorkProvider.Get();

        var product = new Product
        {
            Title = model.Title,
            Price = model.Price,
            Remained = model.Remained,
            MarketId = 1,
            CreatedAt = PreciseTimestampGenerator.Generate()
        };
        
        unitOfWork.ProductRepository.Create(product);
        return RedirectToAction("Index", "Baraholka");
    }
}