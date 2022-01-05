import firebaseInIt from "../firebase/firebase.init.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

firebaseInIt();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  //register
  function UserRegister(newUserData, history) {
    const { name, email, password } = newUserData;
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUserName(name);
        addUserToDB(name, email);

        setUser(result.user);
        history.replace("/");
      })
      .catch((err) => {

      })
      .finally(() => setLoading(false));
  }
  // add user to db
  function addUserToDB(name, email) {
    fetch("https://radiant-ravine-14055.herokuapp.com/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => { });
  }

  // set username
  function setUserName(name) {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => { })
      .catch((error) => { });
  }

  //  signed-in user

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribed;
  }, []);

  // login
  function userLogin({ email, password, history, redirect }) {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {

        setUser(result.user);
        history.replace(redirect);
      })
      .catch((err) => {

      })
      .finally(() => setLoading(false));
  }

  // logout
  function logout() {
    setLoading(true);
    signOut(auth)
      .then(() => {

        setUser({});
      })
      .catch((err) => {

      })
      .finally(() => setLoading(false));
  }

  return { UserRegister, ...user, loading, userLogin, logout };
};

export default useFirebase;
