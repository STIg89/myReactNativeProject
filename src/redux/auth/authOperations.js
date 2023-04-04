import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authRegistrationUser =
  ({ userName, userEmail, userPassword }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, userEmail, userPassword);
      await updateProfile(auth.currentUser, {
        displayName: userName,
      });

      const { uid, displayName, email } = auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          authorized: true,
        })
      );
    } catch (error) {
      return error.message;
    }
  };

export const authLoginUser =
  ({ userEmail, userPassword }) =>
  async (dispatch) => {
    await signInWithEmailAndPassword(auth, userEmail, userPassword);

    try {
    } catch (error) {
      return error.message;
    }
  };

export const authLogoutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogout());
  } catch (error) {
    return error.message;
  }
};

export const updateAuthStateUser = () => (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email } = user;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          userEmail: email,
          authorized: true,
        })
      );
    }
  });
};
