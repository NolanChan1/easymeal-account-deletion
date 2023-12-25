"use client";

import { PropsWithChildren, useState, useRef } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";

import { auth } from "./firebase-config";

type ResetPasswordModalProps = PropsWithChildren<{
  visible: boolean;
  setVisibilityFunction: (newState: boolean) => void;
  setResetSuccessVisibleFunction: (newState: boolean) => void;
}>;

export default function ResetPasswordModal({
  visible,
  setVisibilityFunction,
  setResetSuccessVisibleFunction,
}: ResetPasswordModalProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);

  /*
  const [successMessageTimeout, setSuccessMessageTimeout] =
    useState<any>(undefined);
  */

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const resetPassword = async () => {
    const success = await sendPasswordResetEmail(
      emailInputRef.current?.value || "",
    );

    /*
    if (success) {
      setResetSuccessVisibleFunction(true);

      if (successMessageTimeout) {
        clearTimeout(successMessageTimeout);
      }
      setSuccessMessageTimeout(
        setTimeout(() => setResetSuccessVisibleFunction(false), 5000),
      );

      setVisibilityFunction(false);
    }
    */
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
              Reset Password
            </h3>
            <p className="mx-auto mt-6 w-80 text-sm font-normal tracking-wide text-black-800 md:mt-8 md:w-96 xl:mt-10 xl:text-base">
              To reset your password, please enter your EasyMeal account email
              below and then click on the "Please send password reset email"
              button. If the email provided is linked to an EasyMeal account, an
              email with instructions on resetting your password will be sent to
              your inbox.{" "}
              <span className="font-medium">(Email might appear in spam)</span>
            </p>

            <form
              onSubmit={resetPassword}
              className="flex flex-col items-center justify-start"
            >
              <input
                type="text"
                placeholder="Email"
                ref={emailInputRef}
                className="font-regular mt-4 h-12 w-80 rounded-2xl border-2 border-off-white-200 pl-4 text-sm tracking-wide text-black-800 placeholder:text-black-700 focus:outline-black-700 md:mt-5 md:h-14 md:w-96 xl:mt-6 xl:text-base"
              ></input>

              {error !== undefined && (
                <div className="font-regular mt-1 w-80 text-left text-xs tracking-wide text-red-500 md:mt-2 md:w-96 xl:text-sm">
                  There was an error with resetting your password. Please try
                  again.
                </div>
              )}

              <button
                type="submit"
                className="mt-10 h-12 w-80 rounded-2xl bg-purple-400 text-sm font-semibold tracking-wide text-off-white-100 hover:bg-purple-500 md:mt-12 md:h-14 md:w-96 xl:text-base"
              >
                Please send password reset email
              </button>
            </form>

            <button
              onClick={() => setVisibilityFunction(false)}
              className="mt-4 h-12 w-80 rounded-2xl bg-red-400 text-center text-sm font-semibold tracking-wide text-off-white-100 hover:bg-red-500 md:mt-6 md:h-14 md:w-96 xl:text-base"
            >
              Close Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
