import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, UserRole } from '../types';

export const authService = {
  /**
   * Register a new user with email + password
   */
  signUp: async (params: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: UserRole;
  }) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, params.email, params.password);
      await updateProfile(cred.user, { displayName: params.name });

      const userData: Omit<User, 'id'> = {
        name: params.name,
        email: params.email,
        phone: params.phone,
        role: params.role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, 'users', cred.user.uid), userData);

      return { success: true, user: cred.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign in with email + password
   */
  signIn: async (email: string, password: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: cred.user };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Sign out current user
   */
  signOut: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Get user profile from Firestore
   */
  getUserProfile: async (uid: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        return { success: true, user: { id: snap.id, ...snap.data() } as User };
      }
      return { success: false, error: 'User profile not found' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Update user profile in Firestore
   */
  updateUserProfile: async (uid: string, data: Partial<User>) => {
    try {
      await updateDoc(doc(db, 'users', uid), { ...data, updatedAt: serverTimestamp() });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Send password reset email
   */
  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChanged: (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  /**
   * Get currently logged-in Firebase user
   */
  getCurrentUser: () => auth.currentUser,
};
