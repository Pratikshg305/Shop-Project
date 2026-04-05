from flask import Blueprint, request, jsonify
from app import db
from app.models import Product, Category

products_bp = Blueprint('products', __name__)


@products_bp.route('', methods=['GET'])
def get_products():
    category = request.args.get('category')
    search = request.args.get('search', '').strip()

    query = Product.query
    if category and category != 'All':
        query = query.filter(Product.category == category)
    if search:
        term = f'%{search}%'
        query = query.filter(
            db.or_(
                Product.name.ilike(term),
                Product.brand.ilike(term),
                Product.category.ilike(term),
            )
        )
    products = query.order_by(Product.name).all()
    return jsonify([p.to_dict() for p in products])


@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


@products_bp.route('', methods=['POST'])
def create_product():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('category') or not data.get('price'):
        return jsonify({'error': 'name, category and price are required'}), 400

    cat = Category.query.filter_by(name=data['category']).first()
    if not cat:
        return jsonify({'error': 'Category not found'}), 400

    product = Product(
        name=data['name'],
        category=data['category'],
        category_id=cat.id,
        brand=data.get('brand', ''),
        price=float(data['price']),
        mrp=float(data.get('mrp', data['price'])),
        stock=int(data.get('stock', 0)),
        unit=data.get('unit', 'Unit'),
        description=data.get('description', ''),
        min_stock=int(data.get('minStock', 10)),
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201


@products_bp.route('/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'name' in data:
        product.name = data['name']
    if 'category' in data:
        cat = Category.query.filter_by(name=data['category']).first()
        if cat:
            product.category = data['category']
            product.category_id = cat.id
    if 'brand' in data:
        product.brand = data['brand']
    if 'price' in data:
        product.price = float(data['price'])
    if 'mrp' in data:
        product.mrp = float(data['mrp'])
    if 'stock' in data:
        product.stock = int(data['stock'])
    if 'unit' in data:
        product.unit = data['unit']
    if 'description' in data:
        product.description = data['description']
    if 'minStock' in data:
        product.min_stock = int(data['minStock'])

    db.session.commit()
    return jsonify(product.to_dict())


@products_bp.route('/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})


@products_bp.route('/<int:product_id>/stock', methods=['PATCH'])
def update_stock(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    if not data or 'quantity' not in data or 'type' not in data:
        return jsonify({'error': 'quantity and type are required'}), 400

    quantity = int(data['quantity'])
    stock_type = data['type']

    if stock_type == 'in':
        product.stock += quantity
    elif stock_type == 'out':
        product.stock = max(0, product.stock - quantity)
    else:
        return jsonify({'error': 'type must be "in" or "out"'}), 400

    db.session.commit()
    return jsonify(product.to_dict())
