// Data Produk & Master Store "Toko Online Elektronik Jaya Putra"
// Mata Uang: Rupiah (IDR), Garansi Resmi Distributor Indonesia

export const CATEGORIES = [
  { id: 'all', name: 'Semua Kategori', icon: 'Grid' },
  { id: 'smartphone', name: 'Smartphone & Tablet', icon: 'Smartphone' },
  { id: 'laptop', name: 'Laptop & Komputer', icon: 'Laptop' },
  { id: 'audio', name: 'Audio & Headphone', icon: 'Headphones' },
  { id: 'tv', name: 'Smart TV & Visual', icon: 'Tv' },
  { id: 'smarthome', name: 'Smart Home & Dapur', icon: 'Home' },
  { id: 'gaming', name: 'Gaming & Aksesoris', icon: 'Gamepad2' },
];

export const BRANDS = [
  'Apple',
  'Samsung',
  'Sony',
  'ASUS',
  'LG',
  'Philips',
  'Xiaomi',
  'Logitech',
  'Marshall',
  'Lenovo'
];

export const INITIAL_PRODUCTS = [
  {
    id: 'jp-prod-1',
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    category: 'audio',
    brand: 'Sony',
    price: 5299000,
    originalPrice: 5999000,
    rating: 4.9,
    reviewsCount: 142,
    stock: 18,
    isFeatured: true,
    isFlashSale: true,
    warranty: 'Garansi Resmi 1 Tahun PT Sony Indonesia',
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Headphone flagship nirkabel dari Sony dengan prosesor Integrated Processor V1 dan HD Noise Cancelling Processor QN1. Baterai tahan hingga 30 jam pemakaian nonstop dengan pengisian cepat 3 menit untuk 3 jam playback.',
    specs: {
      'Tipe Driver': '30mm Karbon Fiber Ringan',
      'Konektivitas': 'Bluetooth 5.2, Multipoint, Jack 3.5mm',
      'Daya Tahan Baterai': 'Hingga 30 Jam (ANC On)',
      'Pengisian Daya': 'USB-C Fast Charging (PD)',
      'Bobot': '250 gram',
      'Mikrofon': '8 Mikrofon dengan AI Beamforming Voice Pickup'
    }
  },
  {
    id: 'jp-prod-2',
    name: 'Apple MacBook Air M3 13-inch (16GB / 512GB) Space Gray',
    category: 'laptop',
    brand: 'Apple',
    price: 20499000,
    originalPrice: 22499000,
    rating: 4.95,
    reviewsCount: 88,
    stock: 9,
    isFeatured: true,
    isFlashSale: false,
    warranty: 'Garansi Resmi 1 Tahun Apple Indonesia (iBox/TAM)',
    tag: 'POPULER',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Bertenaga chip Apple M3 super kencang dengan 8-core CPU dan 10-core GPU. Desain unibody aluminium tipis tanpa kipas pendingin (fanless) sehingga bekerja dengan senyap total sepanjang hari.',
    specs: {
      'Prosesor': 'Apple Silicon M3 8-Core CPU',
      'Grafis': '10-Core GPU terintegrasi hardware ray tracing',
      'Memori RAM': '16GB Unified Memory',
      'Penyimpanan': '512GB Superfast SSD',
      'Layar': '13.6-inch Liquid Retina True Tone 500 nits',
      'Port': 'MagSafe 3, 2x Thunderbolt 4, Headphone Jack 3.5mm'
    }
  },
  {
    id: 'jp-prod-3',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB / 512GB) Titanium Gray',
    category: 'smartphone',
    brand: 'Samsung',
    price: 21999000,
    originalPrice: 23999000,
    rating: 4.85,
    reviewsCount: 165,
    stock: 14,
    isFeatured: true,
    isFlashSale: true,
    warranty: 'Garansi Resmi 1 Tahun PT Samsung Electronics Indonesia (SEIN)',
    tag: 'FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Smartphone terdepan dengan bodi Titanium tangguh, S-Pen terintegrasi, dan Galaxy AI cerdas untuk penerjemah langsung, Circle to Search, dan kamera 200MP Quad Tele System.',
    specs: {
      'Chipset': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'Kamera Utama': '200MP Wide + 50MP Periscope 5x + 10MP Tele 3x + 12MP Ultra-wide',
      'Layar': '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits, Corning Gorilla Armor',
      'Baterai': '5000 mAh dengan 45W Super Fast Charging',
      'RAM / Internal': '12GB / 512GB UFS 4.0',
      'Fitur Tambahan': 'S-Pen Bawaan, IP68 Tahan Air & Debu'
    }
  },
  {
    id: 'jp-prod-4',
    name: 'LG C3 55-inch 4K OLED evo Smart TV (OLED55C3PSA)',
    category: 'tv',
    brand: 'LG',
    price: 18499000,
    originalPrice: 21999000,
    rating: 4.9,
    reviewsCount: 54,
    stock: 6,
    isFeatured: true,
    isFlashSale: false,
    warranty: 'Garansi Resmi 2 Tahun PT LG Electronics Indonesia',
    tag: 'PREMIUM OLED',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Panel OLED evo dengan prosesor canggih α9 AI 4K Gen6 memberikan kontras hitam sempurna tanpa backlight bleeding. Mendukung Dolby Vision, Dolby Atmos, 4 port HDMI 2.1 120Hz & G-Sync untuk gaming konsol PS5.',
    specs: {
      'Tipe Panel': 'OLED evo 4K (3840 x 2160) Infinite Contrast',
      'Refresh Rate': 'Native 120Hz VRR, ALLM, FreeSync & G-Sync',
      'Prosesor AI': 'α9 AI Processor 4K Gen6',
      'Sistem Operasi': 'webOS 23 dengan Magic Remote',
      'Audio': '40W 2.2 Channel Dolby Atmos & AI Sound Pro',
      'Koneksi': '4x HDMI 2.1, 3x USB, Wi-Fi 5, Bluetooth 5.0'
    }
  },
  {
    id: 'jp-prod-5',
    name: 'ASUS ROG Zephyrus G14 (AMD Ryzen 9 / RTX 4070 / 32GB)',
    category: 'laptop',
    brand: 'ASUS',
    price: 31999000,
    originalPrice: 34999000,
    rating: 4.88,
    reviewsCount: 42,
    stock: 5,
    isFeatured: false,
    isFlashSale: true,
    warranty: 'Garansi Resmi 2 Tahun Asus Indonesia + Perfect Warranty',
    tag: 'GAMING PRO',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Laptop gaming ultra-ringkas berbobot hanya 1.5kg dengan layar OLED ROG Nebula 3K 120Hz. Sangat kencang untuk rendering 3D, coding, maupun bermain game AAA grafis maksimal.',
    specs: {
      'Prosesor': 'AMD Ryzen 9 8945HS dengan Ryzen AI NPU',
      'GPU': 'NVIDIA GeForce RTX 4070 8GB GDDR6 TGP 90W',
      'Layar': '14.0" 3K (2880 x 1800) OLED 120Hz 0.2ms 100% DCI-P3',
      'RAM': '32GB LPDDR5X 6400MHz',
      'Storage': '1TB PCIe 4.0 NVMe M.2 SSD',
      'Berat': '1.5 kg CNC Aluminium Chassis'
    }
  },
  {
    id: 'jp-prod-6',
    name: 'Philips Smart Air Fryer XXL 7.2L Connected (HD9285/90)',
    category: 'smarthome',
    brand: 'Philips',
    price: 2499000,
    originalPrice: 2899000,
    rating: 4.82,
    reviewsCount: 198,
    stock: 25,
    isFeatured: true,
    isFlashSale: false,
    warranty: 'Garansi Resmi 2 Tahun Philips Domestic Appliances',
    tag: 'HEMAT LISTRIK',
    image: 'https://images.unsplash.com/photo-1585675100414-add2e465a136?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585675100414-add2e465a136?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Memasak makanan renyah lezat dengan pengurangan lemak hingga 90% berkat teknologi Rapid Air. Dilengkapi koneksi Wi-Fi ke aplikasi NutriU untuk memantau waktu masak langsung dari smartphone.',
    specs: {
      'Kapasitas Wadah': '7.2 Liter / 1.4 kg Keranjang Masak',
      'Daya Listrik': '2000 Watt dengan Auto Shut-off',
      'Preset Masak': '16 Fungsi Masak (Goreng, Panggang, Dehydrate, dll)',
      'Konektivitas': 'Wi-Fi terhubung aplikasi NutriU',
      'Material': 'Bebas BPA & Non-stick coating dishwasher safe'
    }
  },
  {
    id: 'jp-prod-7',
    name: 'Logitech G PRO X Superlight 2 Wireless Gaming Mouse',
    category: 'gaming',
    brand: 'Logitech',
    price: 2149000,
    originalPrice: 2399000,
    rating: 4.92,
    reviewsCount: 210,
    stock: 30,
    isFeatured: false,
    isFlashSale: true,
    warranty: 'Garansi Resmi 2 Tahun Logitech Indonesia',
    tag: 'ESPORTS PICK',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Ikon gaming profesional kelas dunia kini lebih ringan dengan bobot 60 gram saja. Dilengkapi switch Hybrid LIGHTFORCE optik-mekanikal dan sensor HERO 2 dengan akurasi 32.000 DPI serta polling rate 2000Hz.',
    specs: {
      'Sensor': 'HERO 2 (100 - 32.000 DPI)',
      'Bobot': '60 gram Ultra-lightweight',
      'Polling Rate': '2000Hz (0.5ms Response)',
      'Baterai': 'Hingga 95 Jam per pengisian USB-C',
      'Koneksi': 'LIGHTSPEED Wireless 2.4GHz + USB'
    }
  },
  {
    id: 'jp-prod-8',
    name: 'Marshall Stanmore III Bluetooth Home Speaker - Black',
    category: 'audio',
    brand: 'Marshall',
    price: 6499000,
    originalPrice: 7299000,
    rating: 4.87,
    reviewsCount: 76,
    stock: 11,
    isFeatured: true,
    isFlashSale: false,
    warranty: 'Garansi Resmi 1 Tahun PT TAM Indonesia',
    tag: 'VINTAGE ICON',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Speaker rumah legendaris dengan panggung suara stereo yang lebih luas dibanding pendahulunya. Didesain dengan estetika vintage rock ‘n’ roll Marshall dan kenop analog kuningan.',
    specs: {
      'Power Amplifiers': '1x 50 Watt Class D Woofer + 2x 15 Watt Class D Tweeters',
      'Frekuensi': '45 - 20.000 Hz',
      'Konektivitas': 'Bluetooth 5.2 (LE Audio ready), AUX 3.5mm, RCA Input',
      'Dimensi': '350 x 203 x 188 mm',
      'Bobot': '4.25 kg'
    }
  },
  {
    id: 'jp-prod-9',
    name: 'Xiaomi Robot Vacuum X20+ with All-in-one Smart Omni Station',
    category: 'smarthome',
    brand: 'Xiaomi',
    price: 5899000,
    originalPrice: 6599000,
    rating: 4.79,
    reviewsCount: 93,
    stock: 8,
    isFeatured: false,
    isFlashSale: false,
    warranty: 'Garansi Resmi 1 Tahun Xiaomi Indonesia',
    tag: 'AUTO CLEAN',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Pembersih lantai otomatis dengan daya hisap super 6000Pa dan dock pintar yang otomatis mencuci kain pel berputar ganda, mengeringkan dengan udara hangat, serta mengosongkan debu ke kantong otomatis.',
    specs: {
      'Daya Hisap': '6000 Pa Tornado Suction',
      'Navigasi': 'LDS Laser + S-Cross Wide Area Obstacle Avoidance',
      'Omni Station': 'Otomatis cuci pel, keringkan, & sedot debu kapasitas 2.5L',
      'Baterai': '5200 mAh (Membersihkan hingga 200m² sekali charge)',
      'Kontrol': 'Mi Home / Xiaomi Home App, Google Assistant, Alexa'
    }
  },
  {
    id: 'jp-prod-10',
    name: 'Samsung 34" Odyssey G8 OLED Curved Gaming Monitor',
    category: 'gaming',
    brand: 'Samsung',
    price: 16999000,
    originalPrice: 18999000,
    rating: 4.91,
    reviewsCount: 39,
    stock: 7,
    isFeatured: false,
    isFlashSale: true,
    warranty: 'Garansi Resmi 3 Tahun PT Samsung Electronics Indonesia',
    tag: 'ULTRAWIDE',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Monitor lengkung 1800R dengan panel QD-OLED resolusi Ultra WQHD (3440 x 1440) dan refresh rate 175Hz dengan response time instan 0.03ms. Dilengkapi prosesor Neo Quantum dan Smart TV Hub bawaan.',
    specs: {
      'Ukuran & Resolusi': '34 Inci UWQHD (3440 x 1440) 21:9 Curved 1800R',
      'Panel': 'QD-OLED 99.3% DCI-P3 VESA DisplayHDR True Black 400',
      'Refresh Rate / GTG': '175Hz / 0.03ms GTG',
      'Port': 'Mini DisplayPort, Micro HDMI 2.1, USB-C 65W Power Delivery',
      'Fitur': 'CoreSync & Core Lighting+, AMD FreeSync Premium Pro'
    }
  },
  {
    id: 'jp-prod-11',
    name: 'Apple iPhone 15 Pro 128GB Natural Titanium',
    category: 'smartphone',
    brand: 'Apple',
    price: 17999000,
    originalPrice: 19999000,
    rating: 4.93,
    reviewsCount: 312,
    stock: 12,
    isFeatured: true,
    isFlashSale: false,
    warranty: 'Garansi Resmi 1 Tahun iBox / Digimap Indonesia',
    tag: 'TITANIUM',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Desain titanium pertama di industri dengan tombol Tindakan baru yang dapat dikustomisasi, chip A17 Pro bertenaga konsol, dan sistem kamera Pro 48MP serbaguna dengan port USB-C 3 berkecepatan tinggi.',
    specs: {
      'Chipset': 'A17 Pro chip 6-core GPU Hardware ray tracing',
      'Layar': '6.1-inch Super Retina XDR OLED, ProMotion 120Hz, Dynamic Island',
      'Kamera': '48MP Utama + 12MP Ultra-wide + 12MP 3x Telephoto',
      'Bahan Bodi': 'Titanium kelas dirgantara dengan kaca belakang bertekstur',
      'Konektivitas': 'USB-C dengan kecepatan transfer USB 3 hingga 10Gbps'
    }
  },
  {
    id: 'jp-prod-12',
    name: 'Lenovo Legion 5i Pro 16" (Intel Core i9 / RTX 4070)',
    category: 'laptop',
    brand: 'Lenovo',
    price: 26499000,
    originalPrice: 28999000,
    rating: 4.84,
    reviewsCount: 51,
    stock: 10,
    isFeatured: false,
    isFlashSale: false,
    warranty: 'Garansi Resmi 3 Tahun Lenovo Legion Ultimate Support + ADP',
    tag: 'PRO GAMER',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'Kombinasi prosesor Intel Gen 14 dan pendingin Legion Coldfront 5.0 bertenaga AI. Layar 16 inci WQXGA 240Hz 500 nits akurat untuk kebutuhan kreasi konten dan turnamen esports.',
    specs: {
      'Prosesor': 'Intel Core i9-14900HX (24 Cores / 32 Threads)',
      'Grafis': 'NVIDIA GeForce RTX 4070 8GB 140W Max TGP',
      'Layar': '16" WQXGA (2560x1600) IPS 240Hz, 500nits 100% sRGB',
      'Memori': '32GB DDR5 5600MHz (2x 16GB Dual Channel)',
      'Penyimpanan': '1TB NVMe PCIe 4.0 SSD'
    }
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 1,
    name: 'Hendra Gunawan',
    role: 'Pengusaha Kafe & Pengguna MacBook',
    city: 'Jakarta Barat',
    rating: 5,
    date: '14 September 2026',
    comment: 'Pesan MacBook M3 sore, besok siangnya langsung sampai di tempat dengan packing kayu sangat rapi. Garansi iBox resmi langsung terdaftar saat di-check di website Apple. Toko Jaya Putra juara pelayanannya!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Siti Rahmawati',
    role: 'Ibu Rumah Tangga & Content Creator',
    city: 'Tangerang Selatan',
    rating: 5,
    date: '02 September 2026',
    comment: 'Air fryer Philips XXL yang saya beli dari Toko Jaya Putra original 100%, kartu garansi distempel resmi. Masak buat anak-anak jadi lebih sehat dan praktis. CS ramah dan solutif waktu tanya-tanya.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Dimas Wicaksono',
    role: 'Software Engineer & Gamer',
    city: 'Surabaya',
    rating: 5,
    date: '28 Agustus 2026',
    comment: 'Beli headphone Sony WH-1000XM5 dan mouse Logitech G Pro Superlight 2. Harganya lebih murah daripada official store di mall tapi tetap dapat garansi distributor resmi PT Sony & Logitech Indonesia. Mantap!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'Budi Santoso',
    role: 'Arsitek Interior',
    city: 'Bandung',
    rating: 5,
    date: '19 Agustus 2026',
    comment: 'Order TV LG OLED 55 inch untuk proyek ruang keluarga klien. Pengiriman luar kota dihandle profesional pakai asuransi penuh dan kurir kargo spesialis. Barang mulus tanpa gores.',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const STORE_STATS = [
  { label: 'Pelanggan Puas Se-Indonesia', value: 28500, suffix: '+', note: 'Sejak 2012' },
  { label: 'Produk Elektronik Terdaftar', value: 1450, suffix: '+', note: '100% Original Resmi' },
  { label: 'Rating Ulasan Pelanggan', value: 4.9, suffix: '/5.0', note: 'Berdasarkan 9.200+ ulasan', isDecimal: true },
  { label: 'Mitra Distributor Resmi', value: 36, suffix: ' Brand', note: 'Garansi Resmi Berlaku' }
];

export const INITIAL_ORDERS = [
  {
    id: 'JP-88291',
    customerName: 'Bambang Sudibyo',
    email: 'bambang.s@gmail.com',
    phone: '081288991234',
    address: 'Jl. Merak No. 14, Menteng, Jakarta Pusat',
    items: [
      { id: 'jp-prod-1', name: 'Sony WH-1000XM5 Wireless Headphones', price: 5299000, quantity: 1 }
    ],
    totalAmount: 5299000,
    shippingFee: 0,
    paymentMethod: 'QRIS',
    status: 'Dikirim', // Pending, Diproses, Dikirim, Selesai, Dibatalkan
    trackingNumber: 'JPEXP-992104-JNE',
    courier: 'JNE Express (Reguler)',
    date: '2026-09-27 14:20',
    history: [
      { time: '2026-09-27 14:20', status: 'Pesanan dibuat oleh pembeli' },
      { time: '2026-09-27 14:22', status: 'Pembayaran QRIS lunas & terverifikasi sistem' },
      { time: '2026-09-27 16:30', status: 'Paket dikemas rapi di Gudang Glodok dengan bubble tebal' },
      { time: '2026-09-28 09:15', status: 'Paket diserahkan ke JNE Manifest Hub Jakarta' },
      { time: '2026-09-28 14:40', status: 'Sedang dibawa kurir JNE menuju alamat penerima' }
    ]
  },
  {
    id: 'JP-77402',
    customerName: 'Anisa Maharani',
    email: 'anisa.m@outlook.com',
    phone: '085712345678',
    address: 'Apartemen Pakubuwono Terrace Tower B-12A, Kebayoran Baru, Jakarta Selatan',
    items: [
      { id: 'jp-prod-6', name: 'Philips Smart Air Fryer XXL 7.2L', price: 2499000, quantity: 1 }
    ],
    totalAmount: 2499000,
    shippingFee: 0,
    paymentMethod: 'BCA Virtual Account',
    status: 'Diproses',
    trackingNumber: 'JPEXP-881290-SCP',
    courier: 'SiCepat Kilat',
    date: '2026-09-28 10:10',
    history: [
      { time: '2026-09-28 10:10', status: 'Pesanan dibuat dan Virtual Account BCA dibuat' },
      { time: '2026-09-28 10:14', status: 'Pembayaran Virtual Account berhasil dikonfirmasi' },
      { time: '2026-09-28 11:30', status: 'Staf gudang sedang melakukan Quality Control & packing aman' }
    ]
  }
];

export const VALID_COUPONS = {
  'JAYAPUTRA10': { discountPercent: 10, maxDiscount: 500000, desc: 'Diskon 10% (Maksimal Rp 500.000)' },
  'ELEKTRONIKASIK': { discountPercent: 5, maxDiscount: 300000, desc: 'Diskon 5% untuk semua produk' },
  'GRATISONGKIR': { discountFixed: 50000, desc: 'Potongan Ongkir Rp 50.000' }
};

export const FAQ_ITEMS = [
  {
    question: 'Apakah produk di Toko Jaya Putra 100% original dan bergaransi resmi?',
    answer: 'Ya, seluruh produk elektronik yang kami sediakan adalah 100% original bergaransi resmi distributor nasional (seperti TAM, iBox, PT Sony Indonesia, SEIN Samsung, Philips Indonesia, Asus Indonesia, LG Indonesia). Kami melampirkan faktur/nota pembelian resmi dan stempel toko untuk mempermudah klaim garansi di seluruh service center resmi di Indonesia.'
  },
  {
    question: 'Bagaimana prosedur keamanan packing untuk barang berharga seperti Laptop dan Smart TV?',
    answer: 'Kami menerapkan standar packing berlapis khusus elektronik: dilapisi bubble wrap tebal berlapis-lapis, kardus proteksi ekstra ganda, serta opsi packing kayu dan wajib asuransi kurir 100% dari nilai barang. Jika terjadi kerusakan fisik akibat kelalaian kurir saat tiba, barang diganti baru dengan menyertakan video unboxing.'
  },
  {
    question: 'Apakah bisa langsung datang belanja ke toko fisik Jaya Putra?',
    answer: 'Sangat bisa! Anda bisa mengunjungi toko fisik kami di Pusat Elektronik Glodok Plaza Lantai Dasar No. 42-44, Jakarta Barat atau Mangga Dua Mall Lantai 2 No. 18, Jakarta Pusat. Anda juga dapat memilih opsi "Ambil di Toko" saat checkout online tanpa biaya kirim.'
  },
  {
    question: 'Metode pembayaran apa saja yang didukung oleh Toko Online Jaya Putra?',
    answer: 'Kami menerima berbagai metode pembayaran instan dan aman: QRIS (GoPay, OVO, Dana, ShopeePay, LinkAja, BCA Mobile), Transfer Virtual Account (BCA, Mandiri, BRI, BNI), Kartu Kredit/Debit Visa & MasterCard, serta Cicilan 0%.'
  },
  {
    question: 'Berapa lama estimasi pengiriman pesanan saya sampai?',
    answer: 'Untuk wilayah Jabodetabek, pengiriman menggunakan Instant / Sameday tiba dalam 2-6 jam, dan reguler 1-2 hari kerja. Untuk kota-kota di pulau Jawa estimasi 1-3 hari, dan luar pulau Jawa estimasi 2-5 hari kerja melalui JNE, SiCepat, atau J&T Cargo.'
  }
];
