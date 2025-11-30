import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          asChild
          variant="outline"
          className="mb-6"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>Last updated: December 1, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information you provide directly to us when you create an account, update your profile, 
                or use our services. This includes your name, email address, username, profile picture, bio, and links.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Display your public profile and links</li>
                <li>Track link clicks and provide analytics</li>
                <li>Send you updates and notifications</li>
                <li>Respond to your requests and support inquiries</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share your information:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>With your consent or at your direction</li>
                <li>To comply with legal obligations</li>
                <li>With service providers who help us operate our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time through 
                your account settings. You can also contact us for assistance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies and similar technologies to provide functionality, analyze usage, and improve 
                your experience on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@treebio.com" className="text-primary hover:underline">
                  privacy@treebio.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
