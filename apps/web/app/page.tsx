import React from "react";
import { Button } from "../components/ui/Button";
import { InputField } from "../components/ui/InputField";
import { FixedButton } from "../components/ui/FixedButton";
import { FixedFooter } from "../components/ui/FixedFooter";

export default function Home() {
  return (
    <div>
      <Button appName="web">Click me</Button>
      <InputField />
      <FixedButton>Click me</FixedButton>
      <FixedFooter />
    </div>
  );
}
