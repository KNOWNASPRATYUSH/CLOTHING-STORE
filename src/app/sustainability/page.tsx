import InfoLayout from '@/components/layout/InfoLayout';

const sustainabilityImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2000&auto=format&fit=crop';

export default function SustainabilityPage() {
  return (
    <InfoLayout 
      title="Sustainable Noir" 
      subtitle="Our Commitment"
      image={sustainabilityImage}
    >
      <div className="space-y-24">
        <section>
          <h2 className="mb-8">Ethics <br /> and Elegance</h2>
          <p>
            For LUX NOIR, sustainability is not a marketing term; it's a fundamental part of our design philosophy. We believe that true luxury must be conscious, ethical, and built to last.
          </p>
          <p className="mt-8">
            Our approach is rooted in the concept of "Circularity by Design." We consider the entire lifecycle of a garment — from the raw fiber to the eventual end-of-life — ensuring that every step minimizes our footprint on the earth.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 my-20">
          <div className="bg-charcoal p-12 space-y-4">
            <h3 className="font-display text-2xl text-off-white">01. Traceability</h3>
            <p className="text-stone text-sm">We provide 100% transparency for our supply chain, mapping every atelier and mill we partner with.</p>
          </div>
          <div className="bg-charcoal p-12 space-y-4">
            <h3 className="font-display text-2xl text-off-white">02. Longevity</h3>
            <p className="text-stone text-sm">Every garment comes with a lifetime repair guarantee to encourage preservation over replacement.</p>
          </div>
        </section>

        <section>
          <h2 className="mb-8">Materials <br /> of Tomorrow</h2>
          <p>
            We prioritise natural, biodegradable, and recycled materials. From GOTS-certified organic cotton to recycled cashmere and vegetable-tanned leather, we select only the materials that meet our high standards for both luxury and environmental responsibility.
          </p>
          <ul className="mt-12 space-y-6">
            <li className="flex items-start gap-4">
              <span className="text-gold mt-1">●</span>
              <p><strong>Organic Silk:</strong> Sourced from heritage farms using pesticide-free mulberry leaves.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gold mt-1">●</span>
              <p><strong>Recycled Wool:</strong> Repurposed from pre-consumer textile waste to reduce water and energy consumption.</p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-gold mt-1">●</span>
              <p><strong>Tencel™ Luxe:</strong> A botanic alternative to traditional silk that is fully biodegradable.</p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-8">Production <br /> Ethics</h2>
          <p>
            We work exclusively with small-scale, ethically vetted ateliers that provide fair wages and a safe, respectful working environment. Our production cycles are deliberately slow, allowing our artisans the time they need to perfect every piece.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
