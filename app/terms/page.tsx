import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
            <CardTitle className="text-4xl font-bold">Terms of Service</CardTitle>
            <CardDescription>Last updated: December 1, 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using TreeBio, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use of Service</h2>
              <p className="text-muted-foreground">
                TreeBio provides a platform for creating and sharing link-in-bio pages. You agree to use 
                the service only for lawful purposes and in accordance with these Terms.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You must be at least 13 years old to use this service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You may not use the service for any illegal or unauthorized purpose</li>
                <li>You must not violate any laws in your jurisdiction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Account Responsibilities</h2>
              <p className="text-muted-foreground">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your content complies with our guidelines</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Content Guidelines</h2>
              <p className="text-muted-foreground">
                You may not post content that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Is illegal, harmful, or violates others' rights</li>
                <li>Contains malware, spam, or phishing attempts</li>
                <li>Infringes on intellectual property rights</li>
                <li>Is hateful, discriminatory, or harassing</li>
                <li>Impersonates another person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                You retain ownership of content you post on TreeBio. By posting content, you grant us a 
                non-exclusive license to use, display, and distribute your content on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Service Availability</h2>
              <p className="text-muted-foreground">
                We strive to maintain service availability but do not guarantee uninterrupted access. 
                We reserve the right to modify or discontinue the service at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account at any time for violations of these terms. 
                You may also delete your account at any time through your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                TreeBio is provided "as is" without warranties of any kind. We shall not be liable for 
                any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. Continued use of the service 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@treebio.com" className="text-primary hover:underline">
                  legal@treebio.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
