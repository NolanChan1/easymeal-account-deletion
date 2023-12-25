"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "./firebase-config";
import eyeOutline from "../public/assets/icons/eye-outline.svg";
import eyeFill from "../public/assets/icons/eye-fill.svg";
import checkmarkCircle from "../public/assets/icons/checkmark-circle-filled.svg";
import DeleteAccountModal from "./DeleteAccountModal";
import ResetPasswordModal from "./ResetPasswordModal";
import Popup from "./Popup";

export default function LoginForm() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [deleteErrorMessageVisible, setDeleteErrorMessageVisible] =
    useState(false);
  const [reauthMessageVisible, setReauthMessageVisible] = useState(false);
  const [passwordResetMessageVisible, setPasswordResetMessageVisible] =
    useState(false);

  const [errorMessageTimeout, setErrorMessageTimeout] =
    useState<any>(undefined);

  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [resetPasswordModalVisible, setResetPasswordModalVisible] =
    useState(false);

  const [user, loading, error] = useAuthState(auth);

  const handlePasswordReset = () => {
    setResetPasswordModalVisible(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //console.log(emailInputRef.current?.value || "");
    signInWithEmailAndPassword(
      auth,
      emailInputRef.current?.value || "",
      passwordInputRef.current?.value || "",
    ).catch((error) => {
      console.log(error.message);
      setErrorMessageVisible(true);

      if (errorMessageTimeout) {
        clearTimeout(errorMessageTimeout);
      }
      setErrorMessageTimeout(
        setTimeout(() => {
          setErrorMessageVisible(false);
        }, 5000),
      );
    });
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <section className="mb-32 mt-16 flex flex-col items-center justify-start md:mb-48 md:mt-20">
      {user ? (
        <div className="flex flex-col items-center justify-start">
          <div className="flex flex-row items-center justify-center gap-4">
            <Image
              src={checkmarkCircle}
              alt="Checkmark icon"
              className="h-6 w-6 2xl:h-8 2xl:w-8"
            />
            <span className="truncate text-nowrap text-sm font-medium tracking-wide text-black-800 2xl:text-base">
              Successfully logged in as{" "}
              <span className="text-purple-400">{user.email}</span>
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="mt-9 h-12 w-80 rounded-2xl border-2 border-purple-400 bg-white text-center text-sm font-semibold tracking-wide text-purple-400 hover:bg-purple-400 hover:text-white md:h-14 md:w-96 xl:text-base"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-start">
          <span className="text-sm font-semibold tracking-wide text-black-800 xl:text-base">
            Login
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-start"
          >
            <input
              type="text"
              placeholder="Email"
              ref={emailInputRef}
              className="font-regular mt-7 h-12 w-80 rounded-2xl border-2 border-off-white-200 pl-4 text-sm tracking-wide text-black-800 placeholder:text-black-700 focus:outline-black-700 md:mt-14 md:h-14 md:w-96 xl:text-base"
            ></input>
            <div className="relative flex flex-col items-start justify-start">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                ref={passwordInputRef}
                className="font-regular mt-4 h-12 w-80 rounded-2xl border-2 border-off-white-200 pl-4 text-sm tracking-wide text-black-800 placeholder:text-black-700 focus:outline-black-700 md:mt-6 md:h-14 md:w-96 xl:text-base"
              ></input>
              <button
                type="button"
                onClick={() =>
                  setPasswordVisible((prevState) => {
                    return !prevState;
                  })
                }
                className="absolute right-0 top-1/2 -translate-x-[2px] -translate-y-[1px] bg-white px-4 md:translate-y-0"
              >
                <Image
                  src={passwordVisible ? eyeFill : eyeOutline}
                  alt={passwordVisible ? "Filled eye icon" : "Outline eye icon"}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </button>
            </div>
            <button
              type="button"
              onClick={handlePasswordReset}
              className="font-regular mt-2 w-80 pl-1 text-left text-xs tracking-wide text-purple-400 hover:text-purple-600 md:mt-3 md:w-96 xl:text-sm"
            >
              Forgot your password?
            </button>

            <button
              type="submit"
              className="mt-8 h-12 w-80 rounded-2xl bg-purple-400 text-sm font-semibold tracking-wide text-off-white-100 hover:bg-purple-500 md:h-14 md:w-96 xl:text-base"
            >
              Login
            </button>
          </form>
        </div>
      )}

      <button
        disabled={user ? false : true}
        onClick={() =>
          setDeleteAccountModalVisible(() => {
            return true;
          })
        }
        className="mt-12 h-12 w-80 rounded-2xl bg-red-400 text-center text-sm font-semibold tracking-wide text-off-white-100 hover:bg-red-500 disabled:bg-red-300 md:mt-16 md:h-14 md:w-96 xl:text-base"
      >
        Delete Account
      </button>

      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        setVisibilityFunction={setDeleteAccountModalVisible}
        setSuccessMessageVisibleFunction={setSuccessMessageVisible}
        setDeleteErrorMessageVisibleFunction={setDeleteErrorMessageVisible}
        setReauthMessageVisibleFunction={setReauthMessageVisible}
      />

      <ResetPasswordModal
        visible={resetPasswordModalVisible}
        setVisibilityFunction={setResetPasswordModalVisible}
        setResetSuccessVisibleFunction={setPasswordResetMessageVisible}
      />

      <Popup
        errorVisible={errorMessageVisible}
        successVisible={successMessageVisible}
        deleteErrorVisible={deleteErrorMessageVisible}
        reauthVisible={reauthMessageVisible}
        passwordResetVisible={passwordResetMessageVisible}
      />
    </section>
  );
}
