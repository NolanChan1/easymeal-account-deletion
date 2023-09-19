"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="mx-auto flex flex-row items-center justify-center">
        <h1 className="text-5xl font-semibold">EasyMeal Account Deletion</h1>
      </header>
      <main className="mx-auto flex max-w-body flex-col items-start justify-start">
        <p>
          If you wish to delete your EasyMeal account and the data associated
          with it, please login to this page with your account credentials and
          then click the “Delete Account” button.
        </p>
      </main>
    </div>
  );
}
