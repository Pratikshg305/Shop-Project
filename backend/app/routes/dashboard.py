from flask import Blueprint, jsonify
from app.models import Product, Order, Category, Supplier

dashboard_bp = Blueprint('dashboard', __name__)


@dashboard_bp.route('/stats', methods=['GET'])
def get_stats():
    products = Product.query.all()
    orders = Order.query.all()
    categories = Category.query.all()
    suppliers = Supplier.query.all()

    total_products = len(products)
    total_stock = sum(p.stock for p in products)
    low_stock = [p for p in products if 0 < p.stock <= p.min_stock]
    out_of_stock = [p for p in products if p.stock == 0]
    total_orders = len(orders)
    pending_orders = [o for o in orders if o.status in ('pending', 'processing')]
    delivered_revenue = sum(o.total for o in orders if o.status == 'delivered')
    well_stocked = len([p for p in products if p.stock > p.min_stock])

    category_stats = []
    for cat in categories:
        cat_products = [p for p in products if p.category == cat.name]
        category_stats.append({
            **cat.to_dict(),
            'totalStock': sum(p.stock for p in cat_products),
            'productCount': len(cat_products),
        })

    low_stock_list = [p.to_dict() for p in out_of_stock + low_stock][:6]

    recent_orders = sorted(orders, key=lambda o: o.date, reverse=True)[:5]
    recent_orders_list = [o.to_dict() for o in recent_orders]

    return jsonify({
        'totalProducts': total_products,
        'totalStock': total_stock,
        'lowStockCount': len(low_stock) + len(out_of_stock),
        'outOfStockCount': len(out_of_stock),
        'totalOrders': total_orders,
        'pendingOrders': len(pending_orders),
        'deliveredRevenue': delivered_revenue,
        'totalSuppliers': len(suppliers),
        'wellStocked': well_stocked,
        'completedOrders': len([o for o in orders if o.status == 'delivered']),
        'categoryStats': category_stats,
        'lowStockProducts': low_stock_list,
        'recentOrders': recent_orders_list,
    })
