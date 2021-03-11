const admin = require('firebase-admin');

const serviceAccount = require('./chaseapp.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const records = []

foo ()

const algoliasearch = require('algoliasearch');
const client = algoliasearch('ST2854US61', 'DONTSAVE')
console.log(client)

const index = client.initIndex('chases');

async function foo () {
  const snapshot = await db.collection('chases').get();
  snapshot.forEach((doc) => {
    const childKey = doc.id
    const childData = doc.data()
    if (doc.id === 'dd95ff20-8130-11eb-b54b-a8f8cdc8b867') {
      console.log(childData)
      console.log(doc.id)
      childData.objectID = doc.id
      records.push(childData)
    }
  })

  index.setSettings({
    'customRanking': ['desc(Votes)'],
    searchableAttributes: [
      'CreatedAt',
      'Desc',
      'Name',
      'Networks',
      'Wheels',
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

