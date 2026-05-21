from django.contrib import admin
from .models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ["subtotal"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "full_name", "email", "wilaya", "payment_method", "status", "total_price", "created_at"]
    list_filter = ["status"]
    search_fields = ["first_name", "last_name", "email"]
    inlines = [OrderItemInline]
    readonly_fields = ["total_price", "session_key", "created_at"]
