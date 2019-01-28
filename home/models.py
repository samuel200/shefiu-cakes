from django.db import models

class Type(models.Model):
    prod_type = models.CharField(max_length=200)

    def __str__(self):
        return self.prod_type

class Product(models.Model):
    prod_name = models.CharField(max_length=200)
    prod_price = models.FloatField(default=0)
    prod_image = models.ImageField()
    prod_time = models.DateTimeField('upload_time', auto_now_add=True)
    prod_type = models.ForeignKey(Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.prod_name



