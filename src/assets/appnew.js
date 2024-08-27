// Thư viện MongoClient giúp kết nối với MongoDB
const MongoClient = require('mongodb').MongoClient;
// URL của cơ sở dữ liệu MongoDB
const url = 'mongodb://localhost:27017';
// Tên database và collection
const dbName = 'Carteam';

const data = {
  "categories": [
    {
      "id": "1",
      "name": "Toyota",
      "img": "menu-1.jpg",
      "quantity": 12
    },
    {
      "id": "2",
      "name": "Honda",
      "img": "menu-2.jpg",
      "quantity": 12
    },
    {
      "id": "3",
      "name": "Ford",
      "img": "menu-3.jpg",
      "quantity": 12
    },
    {
      "id": "4",
      "name": "Chevrolet",
      "img": "menu-4.jpg",
      "cateId": '4',
      "quantity": 12
    }
  ],
  "products": [
    {
        "id": "1",
        "cateId": "1",
        "name": "Honda CBR1000RR",
        "img": "../img/car1.jpg",
        "detail": "A high-performance motorcycle designed for the thrill-seekers. 999cc engine, 189 HP.",
        "price": "$20,000",
        "category": "Moto by"
    },
    {
        "id": "2",
        "cateId": "1",
        "name": "Yamaha YZF-R1",
        "img": "../img/car2.jpg",
        "detail": "A superbike with a powerful 998cc engine. 200 HP, advanced electronics for superb handling.",
        "price": "$22,000",
        "category": "Moto by"
    },
    {
        "id": "3",
        "cateId": "1",
        "name": "Ducati Panigale V4",
        "img": "../img/car3.jpg",
        "detail": "An Italian masterpiece with a 1103cc engine, producing 214 HP. Aerodynamic design.",
        "price": "$25,000",
        "category": "Moto by"
    },
    {
        "id": "4",
        "cateId": "1",
        "name": "Kawasaki Ninja H2",
        "img": "../img/car4.jpg",
        "detail": "A supercharged 998cc engine. 228 HP, aggressive styling, and unmatched performance.",
        "price": "$30,000",
        "category": "Moto by"
    },
    {
        "id": "5",
        "cateId": "1",
        "name": "BMW S1000RR",
        "img": "../img/car5.jpg",
        "detail": "A track-focused superbike with a 999cc engine. 205 HP, dynamic traction control.",
        "price": "$24,000",
        "category": "Moto by"
    },
    {
        "id": "6",
        "cateId": "2",
        "name": "Trek Domane SL 6",
        "img": "../img/car6.jpg",
        "detail": "A performance road bike designed for endurance and comfort. Carbon frame, Shimano Ultegra groupset.",
        "price": "$4,000",
        "category": "Xe đạp độ"
    },
    {
        "id": "7",
        "cateId": "2",
        "name": "Cannondale Synapse Carbon 105",
        "img": "../img/car18.jpg",
        "detail": "A versatile and comfortable endurance bike. Carbon frame, Shimano 105 groupset.",
        "price": "$3,500",
        "category": "Xe đạp độ"
    },
    {
        "id": "8",
        "cateId": "2",
        "name": "Specialized Roubaix Sport",
        "img": "../img/car19.jpg",
        "detail": "An all-around road bike with a focus on comfort. Carbon frame, Shimano 105 groupset.",
        "price": "$3,800",
        "category": "Xe đạp độ"
    },
    {
        "id": "9",
        "cateId": "2",
        "name": "Giant Defy Advanced Pro 1",
        "img": "../img/car7.jpg",
        "detail": "A high-performance endurance bike. Carbon frame, Shimano Ultegra Di2 groupset.",
        "price": "$4,200",
        "category": "Xe đạp độ"
    },
    {
        "id": "10",
        "cateId": "2",
        "name": "Cervelo R3 Disc",
        "img": "../img/car8.jpg",
        "detail": "A lightweight and stiff road bike. Carbon frame, Shimano Ultegra groupset, disc brakes.",
        "price": "$4,500",
        "category": "Xe đạp độ"
    },
    {
        "id": "11",
        "cateId": "3",
        "name": "Toyota Camry",
        "img": "../img/car9.jpg",
        "detail": "A reliable and comfortable midsize sedan. 2.5L engine, advanced safety features.",
        "price": "$25,000",
        "category": "Ô tô"
    },
    {
        "id": "12",
        "cateId": "3",
        "name": "Honda Accord",
        "img": "../img/car10.jpg",
        "detail": "A stylish and efficient sedan with a 1.5L turbocharged engine. Great fuel economy.",
        "price": "$26,000",
        "category": "Ô tô"
    },
    {
        "id": "13",
        "cateId": "3",
        "name": "BMW 3 Series",
        "img": "../img/car11.jpg",
        "detail": "A luxury compact sedan with sporty performance. 2.0L turbocharged engine, premium interior.",
        "price": "$40,000",
        "category": "Ô tô"
    },
    {
        "id": "14",
        "cateId": "3",
        "name": "Audi A4",
        "img": "../img/car12.jpg",
        "detail": "A sophisticated compact luxury sedan. 2.0L turbocharged engine, quattro all-wheel drive.",
        "price": "$39,000",
        "category": "Ô tô"
    },
    {
        "id": "15",
        "cateId": "3",
        "name": "Mercedes-Benz C-Class",
        "img": "../img/car13.jpg",
        "detail": "A premium sedan with a luxurious interior. 2.0L turbocharged engine, advanced tech features.",
        "price": "$41,000",
        "category": "Ô tô"
    },
    {
        "id": "16",
        "cateId": "4",
        "name": "Ford F-150",
        "img": "../img/car14.jpg",
        "detail": "A powerful and versatile full-size pickup truck. 3.5L EcoBoost engine, great towing capacity.",
        "price": "$35,000",
        "category": "Ô tô"
    },
    {
        "id": "17",
        "cateId": "4",
        "name": "Chevrolet Silverado 1500",
        "img": "../img/car15.jpg",
        "detail": "A durable and reliable full-size pickup truck. 5.3L V8 engine, advanced trailering features.",
        "price": "$36,000",
        "category": "Ô tô"
    },
    {
        "id": "18",
        "cateId": "4",
        "name": "Ram 1500",
        "img": "../img/car16.jpg",
        "detail": "A rugged and capable full-size pickup truck. 3.6L V6 engine, smooth ride and handling.",
        "price": "$37,000",
        "category": "Ô tô"
    },
    {
        "id": "19",
        "cateId": "4",
        "name": "Toyota Tundra",
        "img": "../img/car17.jpg",
        "detail": "A reliable and tough full-size pickup truck. 5.7L V8 engine, spacious interior.",
        "price": "$38,000",
        "category": "Ô tô"
    },
    {
        "id": "20",
        "cateId": "4",
        "name": "Nissan Titan",
        "img": "../img/car20.jpg",
        "detail": "A powerful and comfortable full-size pickup truck. 5.6L V8 engine, advanced safety features.",
        "price": "$39,000",
        "category": "Ô tô"
    },
    {
        "id": "21",
        "cateId": "4",
        "name": "GMC Sierra 1500",
        "img": "../img/car21.jpg",
        "detail": "A premium full-size pickup truck with a powerful engine. 6.2L V8, luxurious interior.",
        "price": "$40,000",
        "category": "Ô tô"
    },
],

  "users": [
    {
      "id": "1",
      "fullname": "John Doe",
      "username": "john.doe",
      "email": "john@example.com",
      "password": "password",
      "repassword": "password"
    },
    {
      "id": "417a",
      "fullname": "Bảo Nguyên",
      "username": "baobao123",
      "email": "baobao123@gmail.com",
      "password": "123",
      "repassword": "123"
    },
    {
      "id": "5648",
      "fullname": "baobao",
      "username": "baoooo",
      "email": "baobao123@gmail.com",
      "password": "123",
      "repassword": "123"
    }
  ]
};

async function main() {
  const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);

  try {
    await insertData(db, 'products', data.products);
    await insertData(db, 'categories', data.categories);
    await insertData(db, 'users', data.users);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    client.close();
  }
}

async function insertData(db, collectionName, data) {
  await db.createCollection(collectionName);
  await db.collection(collectionName).insertMany(data);
}

main().catch(console.error);
