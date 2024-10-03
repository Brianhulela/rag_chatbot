import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.js';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return { user }; // Return an object for more information, if needed
};

export default useAuth;