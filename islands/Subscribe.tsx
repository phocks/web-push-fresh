import { Button } from "../components/Button.tsx";

export default function Subscribe(props: any) {
  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => console.log("hello")}>Subscribe</Button>
    </div>
  );
}
