import InfoLayout from '@/components/layout/InfoLayout';

const sustainabilityImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?q=80&w=2000&auto=format&fit=crop';

export default function SustainabilityPage() {
  return (
    <InfoLayout 
      title="Sustainable Noir" 
      subtitle="Our Commitment"
      image={sustainabilityImage}
    >
      <div className="space-y-32">
        <section>
          <h3 className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8">Etiquette</h3>
          <h2 className="mb-10 text-5xl md:text-7xl font-display tracking-tight text-off-white">Ethics <br /> and Elegance</h2>
          <p className="text-stone text-xl md:text-2xl leading-relaxed font-light">
            For LUX NOIR, sustainability is not a marketing term; it&apos;s a fundamental part of our design philosophy. We believe that true luxury must be conscious, ethical, and built to last.
          </p>
          <p className="mt-10 text-stone/80 text-lg md:text-xl leading-relaxed font-light italic">
            Our approach is rooted in the concept of &quot;Circularity by Design.&quot; We consider the entire lifecycle of a garment — from the raw fiber to the eventual end-of-life — ensuring that every step minimizes our footprint on the earth.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 my-24">
          <div className="glass border-subtle p-12 space-y-6 bg-obsidian-light/20 backdrop-blur-xl group hover:bg-gold/5 transition-colors duration-700">
            <h3 className="font-display text-3xl text-gold-gradient tracking-tight">01. Traceability</h3>
            <p className="text-stone text-lg leading-relaxed font-light">We provide 100% transparency for our supply chain, mapping every atelier and mill we partner with to ensure ethical compliance.</p>
          </div>
          <div className="glass border-subtle p-12 space-y-6 bg-obsidian-light/20 backdrop-blur-xl group hover:bg-gold/5 transition-colors duration-700">
            <h3 className="font-display text-3xl text-gold-gradient tracking-tight">02. Longevity</h3>
            <p className="text-stone text-lg leading-relaxed font-light">Every garment is engineered for endurance. We encourage preservation over replacement, fostering a culture of permanent style.</p>
          </div>
        </section>

        <section>
          <h3 className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8">Composition</h3>
          <h2 className="mb-10 text-5xl md:text-7xl font-display tracking-tight text-off-white">Materials <br /> of Tomorrow</h2>
          <p className="text-stone text-xl md:text-2xl leading-relaxed font-light mb-16">
            We prioritise natural, biodegradable, and recycled materials. From GOTS-certified organic cotton to recycled cashmere and vegetable-tanned leather, we select only the materials that meet our high standards for both luxury and responsibility.
          </p>
          
          <ul className="space-y-12 border-t border-white/5 pt-12">
            {[
              { title: 'Organic Silk', desc: 'Sourced from heritage farms using pesticide-free mulberry leaves.' },
              { title: 'Recycled Wool', desc: 'Repurposed from pre-consumer textile waste to reduce water consumption.' },
              { title: 'Lenzing™ Ecovero™', desc: 'A botanic alternative that is fully biodegradable and carbon-neutral.' }
            ].map((item, idx) => (
              <li key={idx} className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group">
                <span className="text-gold font-display text-sm opacity-40 group-hover:opacity-100 transition-opacity">0{idx + 1} {'//'}</span>
                <div className="space-y-2">
                  <h4 className="text-off-white text-xl tracking-wider uppercase font-medium">{item.title}</h4>
                  <p className="text-stone/60 text-lg font-light leading-relaxed max-w-2xl">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-24 border-t border-white/5">
          <h3 className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8">Ateliers</h3>
          <h2 className="mb-10 text-5xl md:text-7xl font-display tracking-tight text-off-white">Production <br /> Ethics</h2>
          <p className="text-stone text-xl md:text-2xl leading-relaxed font-light max-w-4xl">
            We work exclusively with small-scale, ethically vetted ateliers that provide fair wages and a safe, respectful working environment. Our production cycles are deliberately slow, allowing our artisans the time they need to perfect every piece without compromise.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
