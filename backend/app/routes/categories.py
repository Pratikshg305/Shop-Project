from flask import Blueprint, request, jsonify
from app import db
from app.models import Category, Product

categories_bp = Blueprint('categories', __name__)


@categories_bp.route('', methods=['GET'])
def get_categories():
    categories = Category.query.order_by(Category.name).all()
    return jsonify([c.to_dict() for c in categories])


@categories_bp.route('/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = Category.query.get_or_404(category_id)
    return jsonify(category.to_dict())


@categories_bp.route('', methods=['POST'])
def create_category():
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({'error': 'name is required'}), 400

    existing = Category.query.filter_by(name=data['name']).first()
    if existing:
        return jsonify({'error': 'Category already exists'}), 409

    category = Category(
        name=data['name'],
        icon=data.get('icon', '📦'),
        color=data.get('color', '#4caf50'),
        description=data.get('description', ''),
    )
    db.session.add(category)
    db.session.commit()
    return jsonify(category.to_dict()), 201


@categories_bp.route('/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get_or_404(category_id)
    product_count = Product.query.filter_by(category=category.name).count()
    if product_count > 0:
        return jsonify({'error': 'Cannot delete category with existing products'}), 400

    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted'})
