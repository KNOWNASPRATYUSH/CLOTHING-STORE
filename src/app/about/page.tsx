import InfoLayout from '@/components/layout/InfoLayout';
import Image from 'next/image';

const aboutImage = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop';

export default function AboutPage() {
  return (
    <InfoLayout 
      title="About LUX NOIR" 
      subtitle="Our Identity"
      image={aboutImage}
    >
      <div className="space-y-24">
        <section>
          <h2 className="mb-8">The Philosophy <br /> of Noir</h2>
          <p>
            LUX NOIR was founded in 2026 on a singular belief: true luxury is felt, not displayed. We create pieces that speak in whispers — precise tailoring, ethical materials, and an obsessive attention to the details that most will never notice.
          </p>
          <p className="mt-8">
            Where others prioritize noise, we find power in restraint. Our collection is built for the modern individual who seeks elegance through quality and purpose. Each garment is a study in form and shadow, designed to enhance the wearer without overshining them.
          </p>
        </section>

        <section className="relative h-[400px] overflow-hidden my-20">
          <Image 
            src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=1200&q=80" 
            alt="Craftsmanship" 
            fill
            sizes="100vw"
            className="object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
            <p className="font-display text-4xl text-off-white italic">"Restraint is the ultimate form of expression."</p>
          </div>
        </section>

        <section>
          <h2 className="mb-8">Curation <br /> and Craft</h2>
          <p>
            We don't follow seasons; we follow standards. Our pieces are crafted in limited quantities to ensure maximum quality and minimal waste. We source from family-owned mills in Italy and Japan, ensuring that every thread meets our uncompromising Noir standard.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Material</p>
              <p className="text-stone text-sm leading-relaxed">Sourced from archival stocks and small-batch production houses to ensure uniqueness and character.</p>
            </div>
            <div>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Precision</p>
              <p className="text-stone text-sm leading-relaxed">Every seam is triple-checked. Every button is hand-finished. Every garment is an heirloom.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-8">The <br /> Studio</h2>
          <p>
            Based in a secluded studio, our design team works away from the trend-cycle. We believe that by removing external distractions, we can focus on what truly matters: the architecture of a perfect coat, the drape of pure silk, and the permanence of a well-lived wardrobe.
          </p>
        </section>
      </div>
    </InfoLayout>
  );
}
