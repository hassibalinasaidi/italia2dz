from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "product_name", "price", "quantity", "subtotal"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "status", "full_name", "email", "phone", "phone2",
            "payment_method", "address", "wilaya", "commune",
            "total_price", "items", "created_at",
        ]
        read_only_fields = ["status", "total_price", "created_at"]


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "full_name", "email", "phone", "phone2",
            "payment_method", "address", "wilaya", "commune",
        ]
