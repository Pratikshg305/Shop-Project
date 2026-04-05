from app import db
from app.models import Category, Product, Supplier, Order, OrderItem, User


def seed_database():
    """Seed the database with initial data if tables are empty."""
    # Always ensure admin user exists
    if not User.query.filter_by(username='Shreeram_Traders').first():
        # Remove old admin user if exists
        old_admin = User.query.filter_by(username='Short_Parushi').first()
        if old_admin:
            db.session.delete(old_admin)
        admin = User(username='Shreeram_Traders', name='Administrator', role='admin')
        admin.set_password('Teju@123')
        db.session.add(admin)
        db.session.commit()
        print("Default admin user created (Shreeram_Traders / Teju@123)")

    if Category.query.first():
        print("Database already seeded. Skipping.")
        return

    print("Seeding database...")

    # --- Categories ---
    categories_data = [
        {'name': 'Cattle Feed', 'icon': '🐄', 'color': '#4caf50', 'description': 'Complete nutrition for dairy & beef cattle'},
        {'name': 'Poultry Feed', 'icon': '🐔', 'color': '#ff9800', 'description': 'Layer, broiler & chick starter feeds'},
        {'name': 'Fish Feed', 'icon': '🐟', 'color': '#2196f3', 'description': 'Floating & sinking fish feed pellets'},
        {'name': 'Pet Food', 'icon': '🐕', 'color': '#9c27b0', 'description': 'Dog, cat & small animal food'},
        {'name': 'Goat & Sheep Feed', 'icon': '🐐', 'color': '#795548', 'description': 'Balanced nutrition for small ruminants'},
        {'name': 'Horse Feed', 'icon': '🐴', 'color': '#607d8b', 'description': 'Performance & maintenance horse feed'},
        {'name': 'Fodder & Hay', 'icon': '🌾', 'color': '#cddc39', 'description': 'Dry & green fodder, hay bales'},
        {'name': 'Feed Supplements', 'icon': '💊', 'color': '#e91e63', 'description': 'Vitamins, minerals & health boosters'},
        {'name': 'Feed Equipment', 'icon': '⚙️', 'color': '#00bcd4', 'description': 'Feeders, storage bins & mixing tools'},
        {'name': 'Organic Feed', 'icon': '🌿', 'color': '#388e3c', 'description': 'Certified organic & natural feeds'},
    ]

    cat_map = {}
    for c in categories_data:
        cat = Category(**c)
        db.session.add(cat)
        db.session.flush()
        cat_map[c['name']] = cat.id

    # --- Products ---
    products_data = [
        {'name': 'Premium Dairy Cattle Feed', 'category': 'Cattle Feed', 'brand': 'Amul Feed', 'price': 1200, 'mrp': 1400, 'stock': 150, 'unit': '50 Kg', 'description': 'High protein dairy cattle feed for improved milk yield', 'min_stock': 20},
        {'name': 'Calf Starter Feed', 'category': 'Cattle Feed', 'brand': 'Godrej Agrovet', 'price': 950, 'mrp': 1100, 'stock': 80, 'unit': '25 Kg', 'description': 'Nutritious starter feed for calves aged 0-6 months', 'min_stock': 15},
        {'name': 'Cattle Feed Pellets', 'category': 'Cattle Feed', 'brand': 'SKM Animal Feeds', 'price': 1050, 'mrp': 1200, 'stock': 5, 'unit': '50 Kg', 'description': 'Pelleted compound cattle feed for better digestion', 'min_stock': 25},
        {'name': 'Buffalo Special Feed', 'category': 'Cattle Feed', 'brand': 'Amul Feed', 'price': 1350, 'mrp': 1500, 'stock': 60, 'unit': '50 Kg', 'description': 'Specially formulated for high-yielding buffaloes', 'min_stock': 15},
        {'name': 'Broiler Starter Crumble', 'category': 'Poultry Feed', 'brand': 'Cargill', 'price': 1800, 'mrp': 2000, 'stock': 200, 'unit': '50 Kg', 'description': 'Pre-starter & starter feed for broiler chicks', 'min_stock': 30},
        {'name': 'Layer Feed Mash', 'category': 'Poultry Feed', 'brand': 'Suguna Foods', 'price': 1450, 'mrp': 1600, 'stock': 120, 'unit': '50 Kg', 'description': 'Complete layer mash for optimum egg production', 'min_stock': 25},
        {'name': 'Broiler Finisher Pellets', 'category': 'Poultry Feed', 'brand': 'Cargill', 'price': 1950, 'mrp': 2200, 'stock': 90, 'unit': '50 Kg', 'description': 'High energy finisher feed for maximum weight gain', 'min_stock': 20},
        {'name': 'Chick Starter Feed', 'category': 'Poultry Feed', 'brand': 'Godrej Agrovet', 'price': 1600, 'mrp': 1800, 'stock': 3, 'unit': '25 Kg', 'description': 'Balanced starter feed for layer chicks', 'min_stock': 20},
        {'name': 'Floating Fish Feed 2mm', 'category': 'Fish Feed', 'brand': 'Growel', 'price': 2200, 'mrp': 2500, 'stock': 75, 'unit': '25 Kg', 'description': 'High protein floating pellets for fingerlings', 'min_stock': 15},
        {'name': 'Catfish Sinking Pellets', 'category': 'Fish Feed', 'brand': 'CP Aquaculture', 'price': 2800, 'mrp': 3200, 'stock': 45, 'unit': '25 Kg', 'description': 'Premium sinking feed for catfish farming', 'min_stock': 10},
        {'name': 'Shrimp Feed Premium', 'category': 'Fish Feed', 'brand': 'CP Aquaculture', 'price': 3500, 'mrp': 4000, 'stock': 8, 'unit': '20 Kg', 'description': 'High-grade shrimp starter and grower feed', 'min_stock': 12},
        {'name': 'Adult Dog Food - Chicken', 'category': 'Pet Food', 'brand': 'Pedigree', 'price': 850, 'mrp': 950, 'stock': 200, 'unit': '10 Kg', 'description': 'Complete balanced nutrition for adult dogs', 'min_stock': 30},
        {'name': 'Cat Food - Ocean Fish', 'category': 'Pet Food', 'brand': 'Whiskas', 'price': 650, 'mrp': 750, 'stock': 150, 'unit': '7 Kg', 'description': 'Tasty ocean fish recipe for adult cats', 'min_stock': 25},
        {'name': 'Puppy Starter Food', 'category': 'Pet Food', 'brand': 'Royal Canin', 'price': 1200, 'mrp': 1350, 'stock': 60, 'unit': '5 Kg', 'description': 'Veterinary recommended starter food for puppies', 'min_stock': 15},
        {'name': 'Goat Feed Pellets', 'category': 'Goat & Sheep Feed', 'brand': 'Amul Feed', 'price': 800, 'mrp': 950, 'stock': 100, 'unit': '25 Kg', 'description': 'Balanced pellet feed for goats', 'min_stock': 20},
        {'name': 'Sheep Fattening Mix', 'category': 'Goat & Sheep Feed', 'brand': 'SKM Animal Feeds', 'price': 750, 'mrp': 900, 'stock': 70, 'unit': '25 Kg', 'description': 'High energy fattening mix for sheep', 'min_stock': 15},
        {'name': 'Horse Performance Feed', 'category': 'Horse Feed', 'brand': 'Marstall', 'price': 2500, 'mrp': 3000, 'stock': 30, 'unit': '20 Kg', 'description': 'Premium feed for performance horses', 'min_stock': 8},
        {'name': 'Horse Maintenance Pellets', 'category': 'Horse Feed', 'brand': 'Marstall', 'price': 2000, 'mrp': 2400, 'stock': 25, 'unit': '20 Kg', 'description': 'Everyday maintenance feed for leisure horses', 'min_stock': 8},
        {'name': 'Alfalfa Hay Bale', 'category': 'Fodder & Hay', 'brand': 'Green Valley', 'price': 450, 'mrp': 550, 'stock': 300, 'unit': 'Bale', 'description': 'Premium quality alfalfa hay bale', 'min_stock': 50},
        {'name': 'Silage - Maize', 'category': 'Fodder & Hay', 'brand': 'Local Farm', 'price': 350, 'mrp': 400, 'stock': 0, 'unit': '50 Kg', 'description': 'Fermented maize silage for dairy animals', 'min_stock': 40},
        {'name': 'Calcium Supplement Powder', 'category': 'Feed Supplements', 'brand': 'Vetcare', 'price': 380, 'mrp': 450, 'stock': 90, 'unit': '1 Kg', 'description': 'Essential calcium for bone health & milk production', 'min_stock': 20},
        {'name': 'Multi-Vitamin Premix', 'category': 'Feed Supplements', 'brand': 'Vetcare', 'price': 550, 'mrp': 650, 'stock': 65, 'unit': '500 g', 'description': 'Complete vitamin premix for livestock', 'min_stock': 15},
        {'name': 'Liver Tonic Liquid', 'category': 'Feed Supplements', 'brand': 'Himalaya Animal', 'price': 300, 'mrp': 350, 'stock': 2, 'unit': '1 L', 'description': 'Herbal liver tonic for poultry & livestock', 'min_stock': 10},
        {'name': 'Mineral Mixture Block', 'category': 'Feed Supplements', 'brand': 'LME', 'price': 220, 'mrp': 280, 'stock': 180, 'unit': 'Block', 'description': 'Mineral salt lick block for cattle & goats', 'min_stock': 30},
        {'name': 'Automatic Poultry Feeder', 'category': 'Feed Equipment', 'brand': 'FeedMaster', 'price': 1500, 'mrp': 1800, 'stock': 20, 'unit': 'Unit', 'description': 'Gravity-fed automatic poultry feeder - 10 Kg capacity', 'min_stock': 5},
        {'name': 'Feed Storage Bin 100L', 'category': 'Feed Equipment', 'brand': 'FeedMaster', 'price': 3200, 'mrp': 3800, 'stock': 12, 'unit': 'Unit', 'description': 'Airtight plastic feed storage bin 100 litre', 'min_stock': 3},
        {'name': 'Organic Layer Feed', 'category': 'Organic Feed', 'brand': 'Nature Fresh', 'price': 2200, 'mrp': 2600, 'stock': 40, 'unit': '25 Kg', 'description': 'Certified organic feed for free-range layers', 'min_stock': 10},
        {'name': 'Organic Cattle Feed Mash', 'category': 'Organic Feed', 'brand': 'Nature Fresh', 'price': 1800, 'mrp': 2100, 'stock': 35, 'unit': '50 Kg', 'description': 'Chemical-free organic feed for dairy cattle', 'min_stock': 10},
    ]

    product_map = {}
    for p in products_data:
        prod = Product(
            name=p['name'],
            category=p['category'],
            category_id=cat_map[p['category']],
            brand=p['brand'],
            price=p['price'],
            mrp=p['mrp'],
            stock=p['stock'],
            unit=p['unit'],
            description=p['description'],
            min_stock=p['min_stock'],
        )
        db.session.add(prod)
        db.session.flush()
        product_map[p['name']] = prod.id

    # --- Suppliers ---
    suppliers_data = [
        {'name': 'Amul Feed Division', 'contact': 'Rajesh Patel', 'phone': '9876543210', 'email': 'rajesh@amulfeed.com', 'address': 'Anand, Gujarat', 'categories': ['Cattle Feed', 'Goat & Sheep Feed'], 'rating': 4.5},
        {'name': 'Cargill India Pvt Ltd', 'contact': 'Suresh Kumar', 'phone': '9876543211', 'email': 'suresh@cargill.com', 'address': 'Gurgaon, Haryana', 'categories': ['Poultry Feed'], 'rating': 4.8},
        {'name': 'Godrej Agrovet Ltd', 'contact': 'Meena Sharma', 'phone': '9876543212', 'email': 'meena@godrejagrovet.com', 'address': 'Mumbai, Maharashtra', 'categories': ['Cattle Feed', 'Poultry Feed'], 'rating': 4.6},
        {'name': 'CP Aquaculture India', 'contact': 'Vikram Singh', 'phone': '9876543213', 'email': 'vikram@cpaqua.com', 'address': 'Chennai, Tamil Nadu', 'categories': ['Fish Feed'], 'rating': 4.3},
        {'name': 'Pedigree India', 'contact': 'Anita Roy', 'phone': '9876543214', 'email': 'anita@pedigree.com', 'address': 'Delhi, NCR', 'categories': ['Pet Food'], 'rating': 4.7},
        {'name': 'Green Valley Farms', 'contact': 'Harish Joshi', 'phone': '9876543215', 'email': 'harish@greenvalley.com', 'address': 'Pune, Maharashtra', 'categories': ['Fodder & Hay'], 'rating': 4.2},
        {'name': 'Vetcare Supplements', 'contact': 'Dr. Deepak', 'phone': '9876543216', 'email': 'deepak@vetcare.com', 'address': 'Hyderabad, Telangana', 'categories': ['Feed Supplements'], 'rating': 4.4},
        {'name': 'Nature Fresh Organics', 'contact': 'Priya Bansal', 'phone': '9876543217', 'email': 'priya@naturefresh.com', 'address': 'Jaipur, Rajasthan', 'categories': ['Organic Feed'], 'rating': 4.5},
    ]

    for s in suppliers_data:
        cats = s.pop('categories')
        supplier = Supplier(**s)
        for cat_name in cats:
            cat = Category.query.filter_by(name=cat_name).first()
            if cat:
                supplier.categories.append(cat)
        db.session.add(supplier)

    # --- Orders ---
    orders_data = [
        {'customer': 'Ramesh Dairy Farm', 'phone': '9988776601', 'date': '2026-04-01', 'status': 'delivered',
         'items': [{'pname': 'Premium Dairy Cattle Feed', 'qty': 10, 'price': 1200}, {'pname': 'Calcium Supplement Powder', 'qty': 5, 'price': 380}]},
        {'customer': 'Sunrise Poultry', 'phone': '9988776602', 'date': '2026-04-02', 'status': 'processing',
         'items': [{'pname': 'Broiler Starter Crumble', 'qty': 20, 'price': 1800}]},
        {'customer': 'Blue Waters Fish Farm', 'phone': '9988776603', 'date': '2026-04-02', 'status': 'shipped',
         'items': [{'pname': 'Floating Fish Feed 2mm', 'qty': 15, 'price': 2200}, {'pname': 'Catfish Sinking Pellets', 'qty': 10, 'price': 2800}]},
        {'customer': 'Happy Pets Store', 'phone': '9988776604', 'date': '2026-04-03', 'status': 'pending',
         'items': [{'pname': 'Adult Dog Food - Chicken', 'qty': 30, 'price': 850}, {'pname': 'Cat Food - Ocean Fish', 'qty': 20, 'price': 650}]},
        {'customer': 'Gopal Goat Farm', 'phone': '9988776605', 'date': '2026-03-30', 'status': 'delivered',
         'items': [{'pname': 'Goat Feed Pellets', 'qty': 25, 'price': 800}]},
        {'customer': 'Royal Stables', 'phone': '9988776606', 'date': '2026-04-03', 'status': 'processing',
         'items': [{'pname': 'Horse Performance Feed', 'qty': 5, 'price': 2500}, {'pname': 'Alfalfa Hay Bale', 'qty': 50, 'price': 450}]},
        {'customer': 'Green Acres Organic Farm', 'phone': '9988776607', 'date': '2026-04-01', 'status': 'shipped',
         'items': [{'pname': 'Organic Layer Feed', 'qty': 10, 'price': 2200}]},
        {'customer': 'Lakshmi Dairy', 'phone': '9988776608', 'date': '2026-03-28', 'status': 'delivered',
         'items': [{'pname': 'Buffalo Special Feed', 'qty': 15, 'price': 1350}, {'pname': 'Multi-Vitamin Premix', 'qty': 10, 'price': 550}]},
    ]

    for o_data in orders_data:
        total = sum(i['qty'] * i['price'] for i in o_data['items'])
        order = Order(
            customer=o_data['customer'],
            phone=o_data['phone'],
            date=o_data['date'],
            status=o_data['status'],
            total=total,
        )
        db.session.add(order)
        db.session.flush()

        for item in o_data['items']:
            pid = product_map.get(item['pname'], 0)
            oi = OrderItem(
                order_id=order.id,
                product_id=pid,
                name=item['pname'],
                quantity=item['qty'],
                price=item['price'],
            )
            db.session.add(oi)

    db.session.commit()
    print("Database seeded successfully!")
