export const initialCategories = [
  { id: 1, name: 'Cattle Feed', icon: '🐄', color: '#4caf50', description: 'Complete nutrition for dairy & beef cattle', productCount: 12 },
  { id: 2, name: 'Poultry Feed', icon: '🐔', color: '#ff9800', description: 'Layer, broiler & chick starter feeds', productCount: 15 },
  { id: 3, name: 'Fish Feed', icon: '🐟', color: '#2196f3', description: 'Floating & sinking fish feed pellets', productCount: 8 },
  { id: 4, name: 'Pet Food', icon: '🐕', color: '#9c27b0', description: 'Dog, cat & small animal food', productCount: 10 },
  { id: 5, name: 'Goat & Sheep Feed', icon: '🐐', color: '#795548', description: 'Balanced nutrition for small ruminants', productCount: 7 },
  { id: 6, name: 'Horse Feed', icon: '🐴', color: '#607d8b', description: 'Performance & maintenance horse feed', productCount: 5 },
  { id: 7, name: 'Fodder & Hay', icon: '🌾', color: '#cddc39', description: 'Dry & green fodder, hay bales', productCount: 9 },
  { id: 8, name: 'Feed Supplements', icon: '💊', color: '#e91e63', description: 'Vitamins, minerals & health boosters', productCount: 14 },
  { id: 9, name: 'Feed Equipment', icon: '⚙️', color: '#00bcd4', description: 'Feeders, storage bins & mixing tools', productCount: 6 },
  { id: 10, name: 'Organic Feed', icon: '🌿', color: '#388e3c', description: 'Certified organic & natural feeds', productCount: 8 },
];

export const initialProducts = [
  // Cattle Feed
  { id: 101, name: 'Premium Dairy Cattle Feed', category: 'Cattle Feed', brand: 'Amul Feed', price: 1200, mrp: 1400, stock: 150, unit: '50 Kg', image: '', description: 'High protein dairy cattle feed for improved milk yield', minStock: 20 },
  { id: 102, name: 'Calf Starter Feed', category: 'Cattle Feed', brand: 'Godrej Agrovet', price: 950, mrp: 1100, stock: 80, unit: '25 Kg', image: '', description: 'Nutritious starter feed for calves aged 0-6 months', minStock: 15 },
  { id: 103, name: 'Cattle Feed Pellets', category: 'Cattle Feed', brand: 'SKM Animal Feeds', price: 1050, mrp: 1200, stock: 5, unit: '50 Kg', image: '', description: 'Pelleted compound cattle feed for better digestion', minStock: 25 },
  { id: 104, name: 'Buffalo Special Feed', category: 'Cattle Feed', brand: 'Amul Feed', price: 1350, mrp: 1500, stock: 60, unit: '50 Kg', image: '', description: 'Specially formulated for high-yielding buffaloes', minStock: 15 },

  // Poultry Feed
  { id: 201, name: 'Broiler Starter Crumble', category: 'Poultry Feed', brand: 'Cargill', price: 1800, mrp: 2000, stock: 200, unit: '50 Kg', image: '', description: 'Pre-starter & starter feed for broiler chicks', minStock: 30 },
  { id: 202, name: 'Layer Feed Mash', category: 'Poultry Feed', brand: 'Suguna Foods', price: 1450, mrp: 1600, stock: 120, unit: '50 Kg', image: '', description: 'Complete layer mash for optimum egg production', minStock: 25 },
  { id: 203, name: 'Broiler Finisher Pellets', category: 'Poultry Feed', brand: 'Cargill', price: 1950, mrp: 2200, stock: 90, unit: '50 Kg', image: '', description: 'High energy finisher feed for maximum weight gain', minStock: 20 },
  { id: 204, name: 'Chick Starter Feed', category: 'Poultry Feed', brand: 'Godrej Agrovet', price: 1600, mrp: 1800, stock: 3, unit: '25 Kg', image: '', description: 'Balanced starter feed for layer chicks', minStock: 20 },

  // Fish Feed
  { id: 301, name: 'Floating Fish Feed 2mm', category: 'Fish Feed', brand: 'Growel', price: 2200, mrp: 2500, stock: 75, unit: '25 Kg', image: '', description: 'High protein floating pellets for fingerlings', minStock: 15 },
  { id: 302, name: 'Catfish Sinking Pellets', category: 'Fish Feed', brand: 'CP Aquaculture', price: 2800, mrp: 3200, stock: 45, unit: '25 Kg', image: '', description: 'Premium sinking feed for catfish farming', minStock: 10 },
  { id: 303, name: 'Shrimp Feed Premium', category: 'Fish Feed', brand: 'CP Aquaculture', price: 3500, mrp: 4000, stock: 8, unit: '20 Kg', image: '', description: 'High-grade shrimp starter and grower feed', minStock: 12 },

  // Pet Food
  { id: 401, name: 'Adult Dog Food - Chicken', category: 'Pet Food', brand: 'Pedigree', price: 850, mrp: 950, stock: 200, unit: '10 Kg', image: '', description: 'Complete balanced nutrition for adult dogs', minStock: 30 },
  { id: 402, name: 'Cat Food - Ocean Fish', category: 'Pet Food', brand: 'Whiskas', price: 650, mrp: 750, stock: 150, unit: '7 Kg', image: '', description: 'Tasty ocean fish recipe for adult cats', minStock: 25 },
  { id: 403, name: 'Puppy Starter Food', category: 'Pet Food', brand: 'Royal Canin', price: 1200, mrp: 1350, stock: 60, unit: '5 Kg', image: '', description: 'Veterinary recommended starter food for puppies', minStock: 15 },

  // Goat & Sheep Feed
  { id: 501, name: 'Goat Feed Pellets', category: 'Goat & Sheep Feed', brand: 'Amul Feed', price: 800, mrp: 950, stock: 100, unit: '25 Kg', image: '', description: 'Balanced pellet feed for goats', minStock: 20 },
  { id: 502, name: 'Sheep Fattening Mix', category: 'Goat & Sheep Feed', brand: 'SKM Animal Feeds', price: 750, mrp: 900, stock: 70, unit: '25 Kg', image: '', description: 'High energy fattening mix for sheep', minStock: 15 },

  // Horse Feed
  { id: 601, name: 'Horse Performance Feed', category: 'Horse Feed', brand: 'Marstall', price: 2500, mrp: 3000, stock: 30, unit: '20 Kg', image: '', description: 'Premium feed for performance horses', minStock: 8 },
  { id: 602, name: 'Horse Maintenance Pellets', category: 'Horse Feed', brand: 'Marstall', price: 2000, mrp: 2400, stock: 25, unit: '20 Kg', image: '', description: 'Everyday maintenance feed for leisure horses', minStock: 8 },

  // Fodder & Hay
  { id: 701, name: 'Alfalfa Hay Bale', category: 'Fodder & Hay', brand: 'Green Valley', price: 450, mrp: 550, stock: 300, unit: 'Bale', image: '', description: 'Premium quality alfalfa hay bale', minStock: 50 },
  { id: 702, name: 'Silage - Maize', category: 'Fodder & Hay', brand: 'Local Farm', price: 350, mrp: 400, stock: 0, unit: '50 Kg', image: '', description: 'Fermented maize silage for dairy animals', minStock: 40 },

  // Feed Supplements
  { id: 801, name: 'Calcium Supplement Powder', category: 'Feed Supplements', brand: 'Vetcare', price: 380, mrp: 450, stock: 90, unit: '1 Kg', image: '', description: 'Essential calcium for bone health & milk production', minStock: 20 },
  { id: 802, name: 'Multi-Vitamin Premix', category: 'Feed Supplements', brand: 'Vetcare', price: 550, mrp: 650, stock: 65, unit: '500 g', image: '', description: 'Complete vitamin premix for livestock', minStock: 15 },
  { id: 803, name: 'Liver Tonic Liquid', category: 'Feed Supplements', brand: 'Himalaya Animal', price: 300, mrp: 350, stock: 2, unit: '1 L', image: '', description: 'Herbal liver tonic for poultry & livestock', minStock: 10 },
  { id: 804, name: 'Mineral Mixture Block', category: 'Feed Supplements', brand: 'LME', price: 220, mrp: 280, stock: 180, unit: 'Block', image: '', description: 'Mineral salt lick block for cattle & goats', minStock: 30 },

  // Feed Equipment
  { id: 901, name: 'Automatic Poultry Feeder', category: 'Feed Equipment', brand: 'FeedMaster', price: 1500, mrp: 1800, stock: 20, unit: 'Unit', image: '', description: 'Gravity-fed automatic poultry feeder - 10 Kg capacity', minStock: 5 },
  { id: 902, name: 'Feed Storage Bin 100L', category: 'Feed Equipment', brand: 'FeedMaster', price: 3200, mrp: 3800, stock: 12, unit: 'Unit', image: '', description: 'Airtight plastic feed storage bin 100 litre', minStock: 3 },

  // Organic Feed
  { id: 1001, name: 'Organic Layer Feed', category: 'Organic Feed', brand: 'Nature Fresh', price: 2200, mrp: 2600, stock: 40, unit: '25 Kg', image: '', description: 'Certified organic feed for free-range layers', minStock: 10 },
  { id: 1002, name: 'Organic Cattle Feed Mash', category: 'Organic Feed', brand: 'Nature Fresh', price: 1800, mrp: 2100, stock: 35, unit: '50 Kg', image: '', description: 'Chemical-free organic feed for dairy cattle', minStock: 10 },
];

export const initialSuppliers = [
  { id: 1, name: 'Amul Feed Division', contact: 'Rajesh Patel', phone: '9876543210', email: 'rajesh@amulfeed.com', address: 'Anand, Gujarat', categories: ['Cattle Feed', 'Goat & Sheep Feed'], rating: 4.5 },
  { id: 2, name: 'Cargill India Pvt Ltd', contact: 'Suresh Kumar', phone: '9876543211', email: 'suresh@cargill.com', address: 'Gurgaon, Haryana', categories: ['Poultry Feed'], rating: 4.8 },
  { id: 3, name: 'Godrej Agrovet Ltd', contact: 'Meena Sharma', phone: '9876543212', email: 'meena@godrejagrovet.com', address: 'Mumbai, Maharashtra', categories: ['Cattle Feed', 'Poultry Feed'], rating: 4.6 },
  { id: 4, name: 'CP Aquaculture India', contact: 'Vikram Singh', phone: '9876543213', email: 'vikram@cpaqua.com', address: 'Chennai, Tamil Nadu', categories: ['Fish Feed'], rating: 4.3 },
  { id: 5, name: 'Pedigree India', contact: 'Anita Roy', phone: '9876543214', email: 'anita@pedigree.com', address: 'Delhi, NCR', categories: ['Pet Food'], rating: 4.7 },
  { id: 6, name: 'Green Valley Farms', contact: 'Harish Joshi', phone: '9876543215', email: 'harish@greenvalley.com', address: 'Pune, Maharashtra', categories: ['Fodder & Hay'], rating: 4.2 },
  { id: 7, name: 'Vetcare Supplements', contact: 'Dr. Deepak', phone: '9876543216', email: 'deepak@vetcare.com', address: 'Hyderabad, Telangana', categories: ['Feed Supplements'], rating: 4.4 },
  { id: 8, name: 'Nature Fresh Organics', contact: 'Priya Bansal', phone: '9876543217', email: 'priya@naturefresh.com', address: 'Jaipur, Rajasthan', categories: ['Organic Feed'], rating: 4.5 },
];

export const initialOrders = [
  { id: 1001, customer: 'Ramesh Dairy Farm', items: [{ productId: 101, name: 'Premium Dairy Cattle Feed', quantity: 10, price: 1200 }, { productId: 801, name: 'Calcium Supplement Powder', quantity: 5, price: 380 }], total: 13900, status: 'delivered', date: '2026-04-01', phone: '9988776601' },
  { id: 1002, customer: 'Sunrise Poultry', items: [{ productId: 201, name: 'Broiler Starter Crumble', quantity: 20, price: 1800 }], total: 36000, status: 'processing', date: '2026-04-02', phone: '9988776602' },
  { id: 1003, customer: 'Blue Waters Fish Farm', items: [{ productId: 301, name: 'Floating Fish Feed 2mm', quantity: 15, price: 2200 }, { productId: 302, name: 'Catfish Sinking Pellets', quantity: 10, price: 2800 }], total: 61000, status: 'shipped', date: '2026-04-02', phone: '9988776603' },
  { id: 1004, customer: 'Happy Pets Store', items: [{ productId: 401, name: 'Adult Dog Food - Chicken', quantity: 30, price: 850 }, { productId: 402, name: 'Cat Food - Ocean Fish', quantity: 20, price: 650 }], total: 38500, status: 'pending', date: '2026-04-03', phone: '9988776604' },
  { id: 1005, customer: 'Gopal Goat Farm', items: [{ productId: 501, name: 'Goat Feed Pellets', quantity: 25, price: 800 }], total: 20000, status: 'delivered', date: '2026-03-30', phone: '9988776605' },
  { id: 1006, customer: 'Royal Stables', items: [{ productId: 601, name: 'Horse Performance Feed', quantity: 5, price: 2500 }, { productId: 701, name: 'Alfalfa Hay Bale', quantity: 50, price: 450 }], total: 35000, status: 'processing', date: '2026-04-03', phone: '9988776606' },
  { id: 1007, customer: 'Green Acres Organic Farm', items: [{ productId: 1001, name: 'Organic Layer Feed', quantity: 10, price: 2200 }], total: 22000, status: 'shipped', date: '2026-04-01', phone: '9988776607' },
  { id: 1008, customer: 'Lakshmi Dairy', items: [{ productId: 104, name: 'Buffalo Special Feed', quantity: 15, price: 1350 }, { productId: 802, name: 'Multi-Vitamin Premix', quantity: 10, price: 550 }], total: 25750, status: 'delivered', date: '2026-03-28', phone: '9988776608' },
];
