import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db, firebase } from "~/services/firebase";

type User = {
  id: string;
  name?: string;
  avatar?: string;
  email: string;
  metadata?: {
    creationTime: string;
    lastSignInTime: string;
  };
  admin?: boolean;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  createUserWithEmail: any;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);
export default AuthContext;

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          photoURL,
          uid,
          email,
          metadata: { creationTime, lastSignInTime },
        } = user;

        // if (!displayName || !photoURL) {
        //   throw new Error("Missing information from Google Account.");
        // }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
          email,
          metadata: { creationTime, lastSignInTime },
          admin: false,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function createUserWithEmail(email: string, password: string) {
    // const provider = new firebase.auth.EmailAuthProvider();
    const result = await auth.createUserWithEmailAndPassword(email, password);

    if (result.user) {
      const {
        displayName,
        uid,
        email,
        metadata: { creationTime, lastSignInTime },
      } = result.user;

      setUser({
        id: uid,
        name: displayName,
        email,
        metadata: { creationTime, lastSignInTime },
        admin: false,
      });
    }
  }

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const {
        displayName,
        photoURL,
        uid,
        email,
        metadata: { creationTime, lastSignInTime },
      } = result.user;

      // if (!displayName || !photoURL) {
      //   throw new Error("Missing information from Google Account.");
      // }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
        email,
        metadata: { creationTime, lastSignInTime },
        admin: false,
      });

      db.collection("users")
        .doc(user.email)
        .set({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          admin: false,
        })
        .then((userRef) => {
          alert(`${userRef}`);
        });
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, createUserWithEmail }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
