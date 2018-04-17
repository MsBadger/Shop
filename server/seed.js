const Promise = require('bluebird');
const db = require('./db/db.js')
const { Spaceship, User } = require('./db/models')

const spaceships = [
	{
		title: 'Chomper',
		description: 'Looks aggressive but will be great for the kids',
		price: 2,
		inventory: 7,
		vesselType: 'explorer',
		capacity: 10,
		image: 'https://pre00.deviantart.net/0070/th/pre/i/2013/239/f/e/spaceship_by_ghchew-d6jx8ck.jpg'

	},
	{
		title: 'Labradoodle',
		description: 'Lab for writers',
		price: 5.01,
		inventory: 2,
		vesselType: 'conference',
		capacity: 100,
		image: 'https://i.ytimg.com/vi/hObbL4DCesI/maxresdefault.jpg'
	},
	{
		title: 'Lover’s Nest',
		description: 'The wedding of your dreams',
		price: 17,
		inventory: 1,
		vesselType: 'romance',
		capacity: 1000,
		image: 'https://i.imgur.com/M7oW5Lo.jpg'
	},
	{
		title: 'Doomba',
		description: 'Doom by suction',
		price: 1.7,
		inventory: 10,
		vesselType: 'military',
		capacity: 10,
		image: 'http://proofofalien.com/wp-content/uploads/2016/02/Coin-or-disk-shaped-spaceship.jpg'
	},
	{
		title: 'XXX',
		description: 'Where your wildest dreams come true',
		price: 70,
		inventory: 1,
		vesselType: 'romance',
		capacity: 100,
		image: 'https://i.pinimg.com/originals/63/08/a9/6308a9a0e5a754452e0b7b91490a1717.jpg'
	},
	{
		title: 'Cobra',
		description: 'Winning wars',
		price: 50,
		inventory: 3,
		vesselType: 'military',
		capacity: 1000,
		image: 'http://media.moddb.com/images/groups/1/5/4418/fox_11a.jpg'
	},
	{
		title: 'Baby Bird',
		description: 'A cozy ride',
		price: 2.7,
		inventory: 10,
		vesselType: 'explorer',
		capacity: 10,
		image: 'https://wallscover.com/images/spaceship-wallpaper-4.jpg'
	},
	{
		title: 'Solaris',
		description: 'Live long and hover',
		price: 6.2,
		inventory: 1,
		vesselType: 'explorer',
		capacity: 100,
		image: 'https://airandspace.si.edu/sites/default/files/styles/callout_half/public/WEB10041-2003_640.jpg?itok=vvMlOAcO'
	},
	{
		title: 'The Slice',
		description: 'For the foodie corporate groups',
		price: 11,
		inventory: 2,
		vesselType: 'conference',
		capacity: 1000,
		image: 'https://cnet1.cbsistatic.com/img/O8RwAH1Wd3MZX8OhbXAZ9NrylmQ=/936x527/2017/12/20/19b0b6cc-e74c-4a16-8167-596ef97a9251/dreadnought-cnet.jpg'
	}
]

// --------------------------------------------- USERS START ----------------------------------------------


const chance = require('chance')(123);
const toonAvatar = require('cartoon-avatar');

const numUsers = 100;
const emails = chance.unique(chance.email, numUsers);

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  const id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randUser () {
  const gender = chance.gender();
  return User.build({
    name: [chance.first({gender: gender}), chance.last()].join(' '),
    photo: randPhoto(gender),
    phone: chance.phone(),
    email: emails.pop(),
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95])
  });
}

function randTitle () {
  const numWords = chance.natural({
    min: 1,
    max: 8
  });
  return chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  })
  .slice(0, -1);
}

function randStory (createdUsers) {
  const user = chance.pick(createdUsers);
  const numPars = chance.natural({
    min: 3,
    max: 20
  });
  return Story.build({
    author_id: user.id,
    title: randTitle(),
    paragraphs: chance.n(chance.paragraph, numPars)
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Zeke Nierenberg',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phone: '(510) 295-5523',
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: false
  }));
  users.push(User.build({
    name: 'Omri Bernstein',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(781) 854-8854',
    email: 'omri@omri.omri',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    name: 'Kate Humphrey',
    photo: 'https://learndotresources.s3.amazonaws.com/workshop/59ea65d1badb1d0004bf4ca3/baby%20hippo.jpg',
    phone: '(555) 623-7878',
    email: 'kate@kate.kate',
    password: '7890',
    isAdmin: true
  }));
  return users;
}

function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}





// --------------------------------------------- USERS END ----------------------------------------------

const seed = () =>
	Promise.all(spaceships.map(spaceship => {
		Spaceship.create(spaceship)
	}
	))
		.then ( () => createUsers())
		.catch(err => {
			console.error(err)
			console.log('create failed');
		})

const main = () => {
	db.sync({ force: true })
		.then(() => {
			console.log('seeding the database');
			return seed()
		})
		.catch(err => {
			console.log(err.stack)
		})
		.then(() => {
			db.close();
			return null;
		})
}

main();



