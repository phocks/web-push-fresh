import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { Button } from "../components/Button.tsx";

let main;

export default function Subscribe(props) {
  useEffect(() => {
    if (IS_BROWSER) {
      // Your code here. This will run on load and only in the browser.
      console.log("This will run on load and only in the browser.");

      const check = () => {
        if (!("serviceWorker" in navigator)) {
          throw new Error("No Service Worker support!");
        }
        if (!("PushManager" in window)) {
          throw new Error("No Push API Support!");
        }
      };

      const registerServiceWorker = async () => {
        const swRegistration = await navigator.serviceWorker.register(
          "sw.js",
        );
        return swRegistration;
      };

      const requestNotificationPermission = async () => {
        const permission = await window.Notification.requestPermission();
        // value of permission can be 'granted', 'default', 'denied'
        // granted: user has accepted the request
        // default: user has dismissed the notification permission popup by clicking on x
        // denied: user has denied the request.
        if (permission !== "granted") {
          throw new Error("Permission not granted for Notification");
        }
      };

       main = async () => {
        console.log("main")
        check();
        const swRegistration = await registerServiceWorker();
        const permission = await requestNotificationPermission();
      };
      // main(); we will not call main in the beginning.
    }
  }, []);

  return (
    <div class="flex gap-8 py-6">
      <Button onClick={() => main()}>Subscribe</Button>
    </div>
  );
}
