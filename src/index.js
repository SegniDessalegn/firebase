import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,
  query,
  orderBy, serverTimestamp,
  updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBi57UAdRi7j_xt7vahJctcAZ-mdwXLiXA",
  authDomain: "practice-78ac5.firebaseapp.com",
  projectId: "practice-78ac5",
  storageBucket: "practice-78ac5.appspot.com",
  messagingSenderId: "689809552370",
  appId: "1:689809552370:web:e5d25c55e8795f60c8716b"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// realtime collection data
onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

// fetching a single document (& realtime)
const docRef = doc(db, 'books', 'gGu4P9x0ZHK9SspA1d9j')

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})
