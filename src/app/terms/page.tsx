import InfoLayout from '@/components/layout/InfoLayout';

export default function TermsPage() {
  return (
    <InfoLayout title="Terms of Service" subtitle="Agreement">
      <div className="space-y-12">
        <section>
          <h2 className="mb-6 italic">1. Introduction</h2>
          <p>
            By accessing or using the LUX NOIR website (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our Platform.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">2. Use of Service</h2>
          <p>
            You agree to use our Platform for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit any other person's use or enjoyment of the site.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">3. Intellectual Property</h2>
          <p>
            The content, design, and graphics on this Platform are owned by or licensed to LUX NOIR. Unauthorised reproduction or use of any material without our explicit written consent is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">4. Changes to Terms</h2>
          <p>
            LUX NOIR reserves the right to amend these Terms of Service at any time. Any changes will be posted on this page and are effective immediately upon publication.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">5. Liability</h2>
          <p>
            To the maximum extent permitted by law, LUX NOIR shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of or the inability to use our services.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
