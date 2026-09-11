"use client";

import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Select } from "../Select/Select";
import { TextLink } from "../Link/TextLink";

const languageOptions = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "English" },
];

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("uk");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="text-sm text-zinc-700 dark:text-zinc-300">
        Submitted: <strong>{email}</strong> · lang: <strong>{language}</strong>
      </p>
    );
  }

  return (
    <div className="flex w-72 flex-col gap-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
      />
      <Select
        label="Language"
        options={languageOptions}
        value={language}
        onChange={setLanguage}
      />
      <Button label="Submit" onClick={() => setSubmitted(true)} />
      <TextLink href="/demos" muted>
        Back to demos
      </TextLink>
    </div>
  );
}
