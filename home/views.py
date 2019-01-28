from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Product, Type

import json


def index(request):
    context = {
        "products": Product.objects.order_by("-prod_time")[:4],
    }
    return render(request, 'home/index.html', context)

def about(request):
    return render(request, 'home/about.html')

def contact(request):
    return render(request, 'home/contact.html')

def order(request):
    return render(request, 'home/order.html')

def product(request):
    cakes = Type.objects.get(prod_type="cakes")
    pasteries = Type.objects.get(prod_type="pasteries")
    snacks = Type.objects.get(prod_type="snacks")

    context = {
       "cakes": cakes.product_set.all()[:4],
       "pasteries": pasteries.product_set.all()[:4],
       "snacks": snacks.product_set.all()[:4]
    }
    return render(request, 'home/products.html', context)


def order_queryset(request, query):
    if request.method == 'GET':
        product = Product.objects.get(prod_name=query)
        context = {
            'name': product.prod_name,
            'price': product.prod_price,
            'image_url': product.prod_image.url,
        }
        return JsonResponse(context)
    

def products_queryset(request):
    if request.method == "GET":
        response = {
            "products": [product.prod_image.url for product in Product.objects.order_by("-prod_time")[:4]],
        }
        return HttpResponse(json.dumps(response, indent=4))
    return HttpResponse("")
