import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.js';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false); // Set loading to false after user is checked
    });

    return () => unsubscribe();
  }, []);

  return { user, loading }; // Return an object for more information, if needed
};

export default useAuth;