import InfoLayout from '@/components/layout/InfoLayout';

const shippingImage = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop';

export default function ShippingPage() {
  return (
    <InfoLayout 
      title="Global Delivery" 
      subtitle="Shipping & Logistics"
      image={shippingImage}
    >
      <div className="space-y-24">
        <section>
          <h2 className="mb-8 italic">Courier <br /> Excellence</h2>
          <p>
            We offer premium global shipping to over 200 countries. Our logistics partners (DHL Express and FedEx) ensure that your items arrive safely and on time. All orders are tracked and require a signature upon delivery.
          </p>
          <div className="mt-12 overflow-hidden border border-white/5 bg-charcoal rounded-none">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Region</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Courier</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="px-6 py-4 font-body text-off-white">North America</td>
                  <td className="px-6 py-4 font-body text-gold italic">FedEx Priority</td>
                  <td className="px-6 py-4 font-body text-stone">2 – 4 Days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-body text-off-white">Europe</td>
                  <td className="px-6 py-4 font-body text-gold italic">DHL Express</td>
                  <td className="px-6 py-4 font-body text-stone">2 – 3 Days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-body text-off-white">Asia & Oceania</td>
                  <td className="px-6 py-4 font-body text-gold italic">DHL Global</td>
                  <td className="px-6 py-4 font-body text-stone">4 – 6 Days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-body text-off-white">Rest of World</td>
                  <td className="px-6 py-4 font-body text-gold italic">DHL / FedEx</td>
                  <td className="px-6 py-4 font-body text-stone">Up to 8 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-charcoal p-12 border-l-2 border-gold translate-y-4">
          <h3 className="font-display text-3xl mb-4 italic">Next Day Delivery</h3>
          <p className="text-stone text-sm leading-relaxed">For orders placed before 12 PM EST within prime metropolitan areas, we provide guaranteed next-day arrival. Select "Expressed Noir" at checkout.</p>
        </section>

        <section>
          <h2 className="mb-8 italic">Duties <br /> and Taxes</h2>
          <p>
            Please note that international orders may be subject to customs duties and taxes applied by the destination country's customs office. These charges are the responsibility of the recipient. LUX NOIR cannot predict which duties or customs charges will apply.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
