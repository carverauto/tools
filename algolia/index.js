const admin = require('firebase-admin');

const serviceAccount = require('./chaseapp-8459b-10b0387e114a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const records = []

foo ()

const algoliasearch = require('algoliasearch');
const client = algoliasearch('ST2854US61', 'a2479402c21b618e6fd7545cf6d32441');
const index = client.initIndex('chases');

async function foo () {
  const snapshot = await db.collection('chases').get();
  snapshot.forEach((doc) => {
    const childKey = doc.id
    const childData = doc.data()

    childData.objectID = childKey
    records.push(childData)
  })

  index.setSettings({
    'customRanking': ['desc(votes)'],
    searchableAttributes: [
      'createdAt',
      'desc',
      'name',
      'networks',
      'wheels',
    ]
  }).then(() => {
    console.log('Set custom settings')
  })

  index.saveObjects(records).then(() => {
    console.log('Document imported into Algolia')
    process.exit(0)
  }).catch((e) => {
    console.error('Error getting documents ', e)
  })
}

