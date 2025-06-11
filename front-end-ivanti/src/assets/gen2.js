const fs = require('fs');

const totalUsers = 100;
const itemsPerUser = 10;

const posts = [];
let globalId = 101;

for (let userId = 11; userId <= totalUsers; userId++) {
  for (let n = 1; n <= itemsPerUser; n++) {
    posts.push({
      userId: userId,
      id: globalId++,
      title: `Post Title ${n} for User ${userId}`,
      body:  `This is the body of post ${n} belonging to user ${userId}. ` +
        `It contains generated placeholder content for demonstration purposes.`
    });
  }
}

fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
console.log(`Generated posts.json for ${totalUsers} users.`);
