import LoginForm from "@/components/Auth/LoginForm";
import { createMetadata, noIndexRobots } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createMetadata({
  title: "Sign In | Tripyzo",
  description:
    "Sign in to your Tripyzo account to manage flight booking details and travel information.",
  path: "/login",
  keywords: ["Tripyzo login", "Tripyzo account"],
  robots: noIndexRobots,
});

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
