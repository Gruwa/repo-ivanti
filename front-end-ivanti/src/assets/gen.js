const fs = require('fs');

function generateRandomUser(id) {
  return {
    id: id,
    name: `User ${id}`,
    username: `Username${id}`,
    email: `user${id}@example.com`,
    address: {
      street: `Street ${id}`,
      suite: `Suite ${id}`,
      city: `City ${id}`,
      zipcode: `${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      geo: {
        lat: (Math.random() * 180 - 90).toFixed(4),
        lng: (Math.random() * 360 - 180).toFixed(4),
      },
    },
    phone: `${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    website: `website${id}.com`,
    company: {
      name: `Company ${id}`,
      catchPhrase: `Catchphrase ${id}`,
      bs: `Business strategy ${id}`,
    },
  };
}

const users = [];
for (let i = 1; i <= 10000; i++) {
  users.push(generateRandomUser(i));
}

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log('Generated users.json with 10000 users.');
