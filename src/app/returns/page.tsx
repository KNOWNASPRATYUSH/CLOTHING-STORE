import InfoLayout from '@/components/layout/InfoLayout';

export default function ReturnsPage() {
  return (
    <InfoLayout title="Returns & Exchanges" subtitle="Store Policy">
      <div className="space-y-12">
        <section>
          <h2 className="mb-6 italic">Returns Policy</h2>
          <p>
            We take great pride in the quality of our garments. If your purchase does not meet your expectations, we offer returns for store credit or original payment within 14 days of the delivery date.
          </p>
          <ul className="mt-6 list-disc pl-5 space-y-3 text-stone">
            <li>Items must be in original condition, unworn, and unwashed.</li>
            <li>All original tags and labels must be attached.</li>
            <li>Proof of purchase is required for all returns.</li>
            <li>Return shipping costs are the responsibility of the customer.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-6 italic">Process</h2>
          <p>
            To initiate a return, please contact our concierge team at <span className="text-gold">concierge@luxnoir.com</span> with your order number. A return authorisation number will be provided, along with further instructions on shipping your items back to our studio.
          </p>
        </section>

        <section>
          <h2 className="mb-6 italic">Exchanges</h2>
          <p>
            If you wish to exchange an item for a different size or colour, we recommend placing a new order and returning the original piece. This ensures that the item is secured for your collection immediately.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
