"use client";

import { useState } from "react";

export function Newsletter() {
  const [done, setDone] = useState(false);

  // TODO: connect to Mailchimp / Klaviyo / Resend before launch.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) return <p className="font-display text-2xl text-gold" role="status">Thank you. You're on the list.</p>;

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
      <label htmlFor="email" className="sr-only">Email address</label>
      <input
        id="email"
        type="email"
        required
        placeholder="Your email address"
        className="h-14 flex-1 border border-gold/40 bg-transparent px-5 text-sm placeholder:text-ivory/40 focus:border-gold focus:outline-none"
      />
      <button type="submit" className="btn-gold h-14">Join the list</button>
    </form>
  );
}
