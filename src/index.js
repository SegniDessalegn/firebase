import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi57UAdRi7j_xt7vahJctcAZ-mdwXLiXA",
  authDomain: "practice-78ac5.firebaseapp.com",
  projectId: "practice-78ac5",
  storageBucket: "practice-78ac5.appspot.com",
  messagingSenderId: "689809552370",
  appId: "1:689809552370:web:e5d25c55e8795f60c8716b",
};

// init firebase app
initializeApp(firebaseConfig);

// init firestore service
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

const q = query(colRef, where("author", "==", "patrick rothfuss"))

// get real-time docs
onSnapshot(q, (snapshot)=>{
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
})

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
