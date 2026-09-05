export default function EmailSignup({ id = "footer-signup" }) {
  // Configure a hosted endpoint that accepts POST data named "email".
  // The form remains disabled until a provider is connected.
  const signupAction =
    process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ACTION?.trim();

  const enabled = Boolean(signupAction);
  const emailId = `${id}-email`;
  const noteId = `${id}-note`;

  return (
    <form
      action={enabled ? signupAction : undefined}
      method="post"
      aria-label="Email signup"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-[15px] font-medium">
          Email address
        </label>

        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          inputMode="email"
          spellCheck={false}
          required
          disabled={!enabled}
          aria-describedby={noteId}
          className="min-h-11 w-full min-w-0 rounded-btn border border-softsage/30 bg-oat px-4 py-2 text-[16px] text-sage"
        />
      </div>

      <div className="button-frame">
        <button
          type="submit"
          disabled={!enabled}
          className="button-primary w-full"
        >
          Get 15% off
        </button>
      </div>

      <p id={noteId} className="text-[14px]">
        {enabled
          ? "Sign up for Merrythread emails. Unsubscribe anytime."
          : "Email signup is coming soon."}
      </p>
    </form>
  );
}
