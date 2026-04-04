import InfoLayout from '@/components/layout/InfoLayout';

const sizeGuideImage = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop';

export default function SizeGuidePage() {
  return (
    <InfoLayout 
      title="The Perfect Fit" 
      subtitle="Size Guide"
      image={sizeGuideImage}
    >
      <div className="space-y-24">
        <section>
          <h2 className="mb-8 italic">Finding Your <br /> Noir Fit</h2>
          <p>
            Our garments are designed with a variety of silhouettes in mind, from the architectural rigidity of our outerwear to the fluid drape of our silk evening wear. To ensure you find the perfect fit, please refer to the detailed measurements below.
          </p>
          
          <div className="mt-16 overflow-hidden border border-white/5 bg-charcoal rounded-none">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Size</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Bust (cm)</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Waist (cm)</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px] text-stone">Hips (cm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {['XS', 'S', 'M', 'L', 'XL'].map((size, idx) => (
                  <tr key={size}>
                    <td className="px-6 py-4 font-body text-off-white font-bold">{size}</td>
                    <td className="px-6 py-4 font-body text-stone">{80 + idx * 4} – {84 + idx * 4}</td>
                    <td className="px-6 py-4 font-body text-stone">{60 + idx * 4} – {64 + idx * 4}</td>
                    <td className="px-6 py-4 font-body text-stone">{86 + idx * 4} – {90 + idx * 4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="mb-8 italic">Measurement <br /> Guidance</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-gold font-display text-2xl font-light">01.</span>
                <p className="text-stone-light"><strong className="text-off-white block mb-1">Bust</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-gold font-display text-2xl font-light">02.</span>
                <p className="text-stone-light"><strong className="text-off-white block mb-1">Waist</strong> Measure around your natural waistline, the narrowest part of the torso.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-gold font-display text-2xl font-light">03.</span>
                <p className="text-stone-light"><strong className="text-off-white block mb-1">Hips</strong> Measure around the fullest part of your hips, approximately 20cm below the waist.</p>
              </li>
            </ul>
          </div>
          <div className="h-[500px] overflow-hidden bg-charcoal">
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80" 
              alt="Tailoring" 
              className="w-full h-full object-cover opacity-40 grayscale"
            />
          </div>
        </section>

        <section className="border-t border-white/5 pt-16">
          <h2 className="mb-8 italic">Bespoke <br /> Tailoring</h2>
          <p>
            Should you require a bespoke adjustment, many of our signature pieces are designed with generous internal seam allowances to permit minor tailoring for a truly custom silhouette. Visit our Manhattan studio for a private fitting.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
