from flask import Blueprint, request, jsonify
from app import db
from app.models import Order, OrderItem, Product

orders_bp = Blueprint('orders', __name__)


@orders_bp.route('', methods=['GET'])
def get_orders():
    status = request.args.get('status')
    search = request.args.get('search', '').strip()

    query = Order.query
    if status and status != 'all':
        query = query.filter(Order.status == status)
    if search:
        term = f'%{search}%'
        query = query.filter(Order.customer.ilike(term))

    orders = query.order_by(Order.created_at.desc()).all()
    return jsonify([o.to_dict() for o in orders])


@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = Order.query.get_or_404(order_id)
    return jsonify(order.to_dict())


@orders_bp.route('', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data or not data.get('customer') or not data.get('items'):
        return jsonify({'error': 'customer and items are required'}), 400

    order = Order(
        customer=data['customer'],
        phone=data.get('phone', ''),
        total=float(data.get('total', 0)),
        status=data.get('status', 'pending'),
        date=data.get('date', ''),
    )
    db.session.add(order)
    db.session.flush()

    for item_data in data['items']:
        order_item = OrderItem(
            order_id=order.id,
            product_id=int(item_data['productId']),
            name=item_data['name'],
            quantity=int(item_data['quantity']),
            price=float(item_data['price']),
        )
        db.session.add(order_item)

        product = Product.query.get(item_data['productId'])
        if product:
            product.stock = max(0, product.stock - int(item_data['quantity']))

    db.session.commit()
    return jsonify(order.to_dict()), 201


@orders_bp.route('/<int:order_id>/status', methods=['PATCH'])
def update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    data = request.get_json()
    if not data or 'status' not in data:
        return jsonify({'error': 'status is required'}), 400

    valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
    if data['status'] not in valid_statuses:
        return jsonify({'error': f'status must be one of {valid_statuses}'}), 400

    order.status = data['status']
    db.session.commit()
    return jsonify(order.to_dict())
