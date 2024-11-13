import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signInWithRedirect,
  signInWithEmailAndPassword,
  signInAnonymously,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getRedirectResult
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { guestService } from '../services/guestService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Check for redirect result on component mount
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        setUser(result.user);
        navigate('/');
      }
    }).catch((error) => {
      if (error.code !== 'auth/redirect-cancelled-by-user') {
        setError('Authentication failed. Please try again.');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSocialSignIn = async (
    provider: GoogleAuthProvider | FacebookAuthProvider,
    providerName: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-blocked') {
        try {
          // If popup is blocked, fall back to redirect
          await signInWithRedirect(auth, provider);
        } catch (redirectError: any) {
          setError(`Failed to sign in with ${providerName}. Please try again.`);
        }
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User cancelled the popup, don't show error
        return;
      } else {
        setError(`Failed to sign in with ${providerName}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = () => handleSocialSignIn(googleProvider, 'Google');
  const signInWithFacebook = () => handleSocialSignIn(facebookProvider, 'Facebook');

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please register first.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = async () => {
    try {
      setLoading(true);
      setError(null);
      const ip = await guestService.getClientIP();
      const canAccess = await guestService.checkGuestAccess(ip);

      if (!canAccess) {
        throw new Error('Guest access limit reached for today. Please try again tomorrow or sign in with an account.');
      }

      await signInAnonymously(auth);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithFacebook,
    signInWithEmail,
    signInAsGuest,
    signOut
  };
};