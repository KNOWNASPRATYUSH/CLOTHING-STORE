import InfoLayout from '@/components/layout/InfoLayout';

export default function PrivacyPage() {
  return (
    <InfoLayout title="Privacy Statement" subtitle="Data Protection">
      <div className="space-y-12">
        <section>
          <h2 className="mb-6 italic">Our Pledge</h2>
          <p>
            At LUX NOIR, we value your privacy and are committed to protecting your personal information. We only collect data that is essential for providing you with a seamless and luxury shopping experience.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">Information Collection</h2>
          <p>
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, or respond to a survey. This information includes your name, email address, mailing address, phone number, and credit card information.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">Cookies</h2>
          <p>
            We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits. These tools ensure that our boutique is tailored specifically for you.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">Contact</h2>
          <p>
            If you have any questions regarding this privacy policy, you may contact us using the information on our contact page or directly at <span className="text-gold">concierge@luxnoir.com</span>.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
