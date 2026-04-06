'use client';

import InfoLayout from '@/components/layout/InfoLayout';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <InfoLayout title="Connect with Noir" subtitle="Get in Touch">
      <div className="grid md:grid-cols-2 gap-24 items-start">
        <div className="space-y-16">
          <section>
            <h2 className="mb-10 text-5xl md:text-7xl font-display tracking-tight-luxury text-mask uppercase italic leading-none">Global <br /> Relations</h2>
            <p className="text-stone text-xl leading-relaxed font-light tracking-wide max-w-lg">Our team is available to assist with any enquiries, from styling advice to order tracking. We aim to respond within 24 hours.</p>
            <div className="mt-16 space-y-10">
              {[
                { icon: Mail, label: 'Protocols', value: 'concierge@aura.com' },
                { icon: Phone, label: 'Direct', value: '+1 (212) 555-0198' },
                { icon: MapPin, label: 'Studio', value: '742 Hudson Street, New York, NY' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-off-white flex items-center justify-center border border-subtle transition-all duration-700 group-hover:border-charcoal/30">
                    <item.icon size={16} strokeWidth={1} className="text-charcoal" />
                  </div>
                  <div>
                    <p className="text-[8px] text-stone/40 uppercase tracking-[0.5em] mb-1">{item.label}</p>
                    <p className="text-charcoal text-xs tracking-[0.2em] font-medium uppercase">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="glass p-12 md:p-16">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
            <h3 className="font-display text-4xl mb-6 text-mask tracking-tight-luxury uppercase italic">Transmission</h3>
            <div className="space-y-8">
              <div className="group">
                <label className="text-[8px] tracking-[0.5em] uppercase text-stone mb-4 ml-1 group-focus-within:text-charcoal transition-all duration-700">Identity / Name</label>
                <input type="text" placeholder="Jane Noir" className="w-full bg-transparent border-b border-subtle text-charcoal placeholder:text-stone-light/40 py-4 text-[13px] tracking-wide font-body outline-none focus:border-charcoal transition-all duration-1000" />
              </div>
              <div className="group">
                <label className="text-[8px] tracking-[0.5em] uppercase text-stone mb-4 ml-1 group-focus-within:text-charcoal transition-all duration-700">Communication / Email</label>
                <input type="email" placeholder="curator@aura.com" className="w-full bg-transparent border-b border-subtle text-charcoal placeholder:text-stone-light/40 py-4 text-[13px] tracking-wide font-body outline-none focus:border-charcoal transition-all duration-1000" />
              </div>
              <div className="group">
                <label className="text-[8px] tracking-[0.5em] uppercase text-stone mb-4 ml-1 group-focus-within:text-charcoal transition-all duration-700">Subject / Intent</label>
                <select className="w-full bg-transparent border-b border-subtle text-charcoal py-4 text-[13px] tracking-wide font-body outline-none focus:border-charcoal transition-all duration-1000 appearance-none cursor-pointer">
                  <option className="bg-off-white">Product Acquisition</option>
                  <option className="bg-off-white">Styling Consultation</option>
                  <option className="bg-off-white">Atelier Inquiry</option>
                  <option className="bg-off-white">Other</option>
                </select>
              </div>
              <div className="group">
                <label className="text-[8px] tracking-[0.5em] uppercase text-stone mb-4 ml-1 group-focus-within:text-charcoal transition-all duration-700">Manifest / Message</label>
                <textarea rows={4} placeholder="Your message..." className="w-full bg-transparent border-b border-subtle text-charcoal placeholder:text-stone-light/40 py-4 text-[13px] tracking-wide font-body outline-none focus:border-charcoal transition-all duration-1000 resize-none" />
              </div>
            </div>
            <button className="btn-noir w-full">
              <span>Send Transmission</span>
            </button>
          </form>
        </div>
      </div>
    </InfoLayout>
  );
}
