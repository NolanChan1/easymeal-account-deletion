"use client";

import Header from "./Header";
import InformationBody from "./InformationBody";
import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="mx-4 mt-24 flex-col items-start justify-start md:mx-8 md:mt-28 lg:mx-auto lg:mt-32 lg:max-w-body xl:mt-36 2xl:mt-48">
        <InformationBody />
        <LoginForm />
      </main>
    </div>
  );
}
