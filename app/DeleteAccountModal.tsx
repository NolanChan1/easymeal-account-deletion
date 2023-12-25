"use client";

import { PropsWithChildren, useState } from "react";
import { signOut } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { useDeleteUser } from "react-firebase-hooks/auth";

import { auth } from "./firebase-config";

type DeleteAccountModalProps = PropsWithChildren<{
  visible: boolean;
  setVisibilityFunction: (newState: boolean) => void;
  setSuccessMessageVisibleFunction: (newState: boolean) => void;
  setDeleteErrorMessageVisibleFunction: (newState: boolean) => void;
  setReauthMessageVisibleFunction: (newState: boolean) => void;
}>;

export default function DeleteAccountModal({
  visible,
  setVisibilityFunction,
  setSuccessMessageVisibleFunction,
  setDeleteErrorMessageVisibleFunction,
  setReauthMessageVisibleFunction,
}: DeleteAccountModalProps) {
  const [successMessageTimeout, setSuccessMessageTimeout] =
    useState<any>(undefined);
  const [deleteErrorMessageTimeout, setDeleteErrorMessageTimeout] =
    useState<any>(undefined);
  const [reauthMessageTimeout, setReauthMessageTimeout] =
    useState<any>(undefined);

  const [deleteUser, loading, error] = useDeleteUser(auth);

  const deleteAccountDocuments = async () => {
    // Less than ideal way of deleting user data
    const collections = [
      "badges",
      "daily_cooked_recipes",
      "daily_goals",
      "favorites",
      "inventory",
      "profile",
      "weekly_goals",
    ];
    const uid = auth.currentUser?.uid || "";
    const db = getFirestore();
    let success = true;

    for (let i = 0; i < collections.length; i++) {
      const docRef = doc(db, collections[i], uid);
      await deleteDoc(docRef).catch((error) => {
        console.log(error);
        success = false;
      });
      // Add check if document was deleted
    }

    return success;
  };

  const deleteAccount = async () => {
    // First delete user's documents in Firestore
    const deletedAccountDocuments = await deleteAccountDocuments();
    if (!deletedAccountDocuments) {
      setDeleteErrorMessageVisibleFunction(true);

      if (deleteErrorMessageTimeout) {
        clearTimeout(deleteErrorMessageTimeout);
      }
      setDeleteErrorMessageTimeout(
        setTimeout(() => setDeleteErrorMessageTimeout(false), 5000),
      );
      setVisibilityFunction(false);
      return;
    }

    // Delete user
    const success = await deleteUser();
    if (success) {
      setSuccessMessageVisibleFunction(true);

      if (successMessageTimeout) {
        clearTimeout(successMessageTimeout);
      }
      setSuccessMessageTimeout(
        setTimeout(() => setSuccessMessageVisibleFunction(false), 5000),
      );
    } else {
      signOut(auth);
      setReauthMessageVisibleFunction(true);

      if (reauthMessageTimeout) {
        clearTimeout(reauthMessageTimeout);
      }
      setReauthMessageTimeout(
        setTimeout(() => setReauthMessageVisibleFunction(false), 5000),
      );
    }

    setVisibilityFunction(false);
  };

  return (
    <div>
      {visible && (
        <div>
          {/* Background Blur */}
          <div
            onClick={() => setVisibilityFunction(false)}
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black-900/20 backdrop-blur-lg"
          ></div>

          <div className="fixed left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-start rounded-4xl bg-white px-6 py-8 md:p-10 xl:p-16">
            <h3 className="mx-auto text-lg font-semibold tracking-wide text-black-800 xl:text-2xl">
              Confirmation
            </h3>
            <p className="mx-auto mt-6 w-80 text-sm font-normal tracking-wide text-black-800 md:mt-8 md:w-96 xl:mt-10 xl:text-base">
              Are you sure you wish to delete your EasyMeal account?{" "}
              <span className="font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <button
              onClick={() => setVisibilityFunction(false)}
              className="mt-6 h-12 w-80 rounded-2xl bg-purple-400 text-center text-sm font-semibold tracking-wide text-off-white-100 hover:bg-purple-500 md:mt-9 md:h-14 md:w-96 xl:mt-12 xl:text-base"
            >
              I have changed my mind
            </button>
            <button
              onClick={deleteAccount}
              className="mt-4 h-12 w-80 rounded-2xl bg-red-400 text-center text-sm font-semibold tracking-wide text-off-white-100 hover:bg-red-500 md:h-14 md:w-96 xl:mt-6 xl:text-base"
            >
              Please delete my account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
