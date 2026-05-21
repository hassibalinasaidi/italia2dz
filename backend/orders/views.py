from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderCreateSerializer


class OrderCreateView(APIView):
    def post(self, request):
        if not request.session.session_key:
            return Response({"error": "No active cart session."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cart = Cart.objects.get(session_key=request.session.session_key)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)

        if not cart.items.exists():
            return Response({"error": "Cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderCreateSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            session_key=request.session.session_key,
            total_price=cart.total,
            **serializer.validated_data,
        )

        for item in cart.items.select_related("product"):
            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                price=item.product.price,
                quantity=item.quantity,
            )
            # Deduct stock
            item.product.stock -= item.quantity
            item.product.save(update_fields=["stock"])

        cart.items.all().delete()

        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        if not self.request.session.session_key:
            return Order.objects.none()
        return Order.objects.filter(session_key=self.request.session.session_key)
