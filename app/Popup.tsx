import { PropsWithChildren } from "react";
import Image from "next/image";

import checkmarkCircle from "../public/assets/icons/checkmark-circle-filled.svg";
import errorCircle from "../public/assets/icons/error-circle-filled.svg";

type PopupProps = PropsWithChildren<{
  errorVisible: boolean;
  successVisible: boolean;
  deleteErrorVisible: boolean;
  reauthVisible: boolean;
  passwordResetVisible: boolean;
}>;

export default function Popup({
  errorVisible,
  successVisible,
  deleteErrorVisible,
  reauthVisible,
  passwordResetVisible,
}: PopupProps) {
  return (
    <div className="fixed bottom-8 right-8 2xl:bottom-16 2xl:right-16">
      {/* Error Message Popup */}
      <div
        className={`${
          errorVisible
            ? "visible opacity-100"
            : "invisible translate-y-full opacity-0"
        } popup-container`}
      >
        <Image
          src={errorCircle}
          alt="Error icon"
          className="h-6 w-6 2xl:h-8 2xl:w-8"
        />
        <span className="popup-text">Error: Invalid Email or Password</span>
      </div>

      {/* Success Message Popup */}
      <div
        className={`${
          successVisible
            ? "visible opacity-100"
            : "invisible translate-y-full opacity-0"
        } popup-container`}
      >
        <Image
          src={checkmarkCircle}
          alt="Checkmark icon"
          className="h-6 w-6 2xl:h-8 2xl:w-8"
        />
        <span className="popup-text">Successfully Deleted Account</span>
      </div>

      {/* Delete Error Message Popup */}
      <div
        className={`${
          deleteErrorVisible
            ? "visible opacity-100"
            : "invisible translate-y-full opacity-0"
        } popup-container`}
      >
        <Image
          src={errorCircle}
          alt="Error icon"
          className="h-6 w-6 2xl:h-8 2xl:w-8"
        />
        <span className="popup-text">
          Error Deleting User Data. Please Try Again.
        </span>
      </div>

      {/* Reauth Message Popup */}
      <div
        className={`${
          reauthVisible
            ? "visible opacity-100"
            : "invisible translate-y-full opacity-0"
        } popup-container`}
      >
        <Image
          src={errorCircle}
          alt="Error icon"
          className="h-6 w-6 2xl:h-8 2xl:w-8"
        />
        <span className="popup-text">Error: Please Relog (Auth Timeout)</span>
      </div>

      {/* Password Reset Successful Message Popup */}
      <div
        className={`${
          passwordResetVisible
            ? "visible opacity-100"
            : "invisible translate-y-full opacity-0"
        } popup-container`}
      >
        <Image
          src={checkmarkCircle}
          alt="Checkmark icon"
          className="h-6 w-6 2xl:h-8 2xl:w-8"
        />
        <span className="popup-text">Password Reset Email Sent</span>
      </div>
    </div>
  );
}
