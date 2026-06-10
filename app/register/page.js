import RegisterForm from "@/components/Auth/RegisterForm";
import { createMetadata, noIndexRobots } from "@/lib/seo";
import { Suspense } from "react";

export const metadata = createMetadata({
  title: "Create Account | Tripyzo",
  description:
    "Create a Tripyzo account to manage flight booking details and travel support information.",
  path: "/register",
  keywords: ["Tripyzo register", "Tripyzo account"],
  robots: noIndexRobots,
});

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
