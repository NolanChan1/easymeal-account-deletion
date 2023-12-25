export default function InformationBody() {
  return (
    <section className="flex flex-col items-start justify-start">
      <p className="text-sm font-normal leading-normal tracking-wide text-black-800 xl:text-base">
        If you wish to delete your EasyMeal account and the data associated with
        it, please login to this page with your account credentials and then
        click the “Delete Account” button.
      </p>
      <p className="mt-2 text-sm font-semibold leading-normal tracking-wide text-black-700 xl:mt-3 xl:text-base 2xl:mt-4">
        Don&apos;t know what EasyMeal is?{" "}
        <a
          href="https://github.com/NolanChan1"
          target="_blank"
          rel="noreferrer noopener"
          className="text-purple-400 hover:text-purple-600"
        >
          Check out its store page here!
        </a>
      </p>

      <p className="mt-6 text-sm font-normal leading-normal tracking-wide text-black-800 xl:mt-10 xl:text-base 2xl:mt-12">
        Please note that upon account deletion, ALL of the data associated with
        the account with also be deleted. This data includes:
      </p>
      <ul className="ml-8 mt-4 list-outside list-disc text-sm font-normal leading-normal tracking-wide text-black-800 xl:ml-12 xl:text-base 2xl:mt-8">
        <li>Your EasyMeal level</li>
        <li>Your weekly cooking goal and the progress made towards it</li>
        <li>What recipes you have cooked (and when)</li>
        <li>The total estimated amount of money you saved by cooking</li>
        <li>
          Your diet goals and the progress made towards them (caloric, and
          macros)
        </li>
        <li>Your favorited recipes</li>
        <li>Any ingredients (and their amounts) saved to your pantry</li>
        <li>Any collected badges</li>
        <li>Any progress made towards collecting badges</li>
      </ul>

      <p className="mt-6 text-sm font-semibold leading-normal tracking-wide text-black-800 xl:mt-10 xl:text-base 2xl:mt-12">
        IMPORTANT: Deleting an EasyMeal account is irreversible and cannot be
        undone. Your data will not be retained after deletion. Should you wish
        to, you may create another account with the same email address after
        account deletion.
      </p>
    </section>
  );
}
