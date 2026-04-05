from flask import Blueprint, request, jsonify
from app import db
from app.models import Supplier, Category

suppliers_bp = Blueprint('suppliers', __name__)


@suppliers_bp.route('', methods=['GET'])
def get_suppliers():
    search = request.args.get('search', '').strip()
    query = Supplier.query
    if search:
        term = f'%{search}%'
        query = query.filter(
            db.or_(
                Supplier.name.ilike(term),
                Supplier.contact.ilike(term),
            )
        )
    suppliers = query.order_by(Supplier.name).all()
    return jsonify([s.to_dict() for s in suppliers])


@suppliers_bp.route('/<int:supplier_id>', methods=['GET'])
def get_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    return jsonify(supplier.to_dict())


@suppliers_bp.route('', methods=['POST'])
def create_supplier():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('phone'):
        return jsonify({'error': 'name and phone are required'}), 400

    supplier = Supplier(
        name=data['name'],
        contact=data.get('contact', ''),
        phone=data['phone'],
        email=data.get('email', ''),
        address=data.get('address', ''),
        rating=float(data.get('rating', 4.0)),
    )

    cat_names = data.get('categories', [])
    for cat_name in cat_names:
        cat = Category.query.filter_by(name=cat_name).first()
        if cat:
            supplier.categories.append(cat)

    db.session.add(supplier)
    db.session.commit()
    return jsonify(supplier.to_dict()), 201


@suppliers_bp.route('/<int:supplier_id>', methods=['PUT'])
def update_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    if 'name' in data:
        supplier.name = data['name']
    if 'contact' in data:
        supplier.contact = data['contact']
    if 'phone' in data:
        supplier.phone = data['phone']
    if 'email' in data:
        supplier.email = data['email']
    if 'address' in data:
        supplier.address = data['address']
    if 'rating' in data:
        supplier.rating = float(data['rating'])

    if 'categories' in data:
        supplier.categories.clear()
        for cat_name in data['categories']:
            cat = Category.query.filter_by(name=cat_name).first()
            if cat:
                supplier.categories.append(cat)

    db.session.commit()
    return jsonify(supplier.to_dict())


@suppliers_bp.route('/<int:supplier_id>', methods=['DELETE'])
def delete_supplier(supplier_id):
    supplier = Supplier.query.get_or_404(supplier_id)
    db.session.delete(supplier)
    db.session.commit()
    return jsonify({'message': 'Supplier deleted'})
