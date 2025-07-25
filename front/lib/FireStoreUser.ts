import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

const db = getFirestore();

export const saveUserToFirestore = async (user: FirebaseUser) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    id: user.uid,
    name: user.displayName || "Anonymous",
    email: user.email,
    provider: user.providerData[0]?.providerId || "unknown",
    createdAt: serverTimestamp(),
  }, { merge: true });
};