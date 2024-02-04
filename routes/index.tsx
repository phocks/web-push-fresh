/// <reference lib="deno.unstable" />

import { useSignal } from "@preact/signals";
import Subscribe from "../islands/Subscribe.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <Subscribe />
      </div>
    </div>
  );
}
