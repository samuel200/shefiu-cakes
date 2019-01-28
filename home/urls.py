from django.urls import path
from . import views

app_name= "home"

urlpatterns= [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('order/', views.order, name='order'),
    path('order/queryset/<str:query>/', views.order_queryset),
    path('products/', views.product, name='products'),
    path('products/queryset/', views.products_queryset),
    path('products/order/queryset/<str:query>/', views.order_queryset),
]
