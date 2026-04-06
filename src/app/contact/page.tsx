'use client';

import InfoLayout from '@/components/layout/InfoLayout';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <InfoLayout title="Connect with Noir" subtitle="Get in Touch">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <section>
            <h2 className="mb-6">Global Support</h2>
            <p>Our team is available to assist with any enquiries, from styling advice to order tracking. We aim to respond within 24 hours.</p>
            <div className="mt-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-light/20 flex items-center justify-center rounded-sm border border-subtle">
                  <Mail size={18} className="text-charcoal" />
                </div>
                <div>
                  <p className="text-xs text-stone uppercase tracking-widest">Email</p>
                  <p className="text-charcoal">concierge@luxnoir.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-light/20 flex items-center justify-center rounded-sm border border-subtle">
                  <Phone size={18} className="text-charcoal" />
                </div>
                <div>
                  <p className="text-xs text-stone uppercase tracking-widest">Phone</p>
                  <p className="text-charcoal">+1 (212) 555-0198</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-light/20 flex items-center justify-center rounded-sm border border-subtle">
                  <MapPin size={18} className="text-charcoal" />
                </div>
                <div>
                  <p className="text-xs text-stone uppercase tracking-widest">Studio</p>
                  <p className="text-charcoal">742 Hudson Street, New York, NY</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div>
          <form onSubmit={(e) => e.preventDefault()} className="bg-paper-white border border-subtle p-10 space-y-8 backdrop-blur-md">
            <h3 className="font-display text-3xl mb-4 text-charcoal">Send a Message</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase text-stone block mb-2">FullName</label>
                <input type="text" className="w-full bg-off-white border border-subtle p-4 text-charcoal focus:border-charcoal/30 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase text-stone block mb-2">Email Address</label>
                <input type="email" className="w-full bg-off-white border border-subtle p-4 text-charcoal focus:border-charcoal/30 outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase text-stone block mb-2">Subject</label>
                <select className="w-full bg-off-white border border-subtle p-4 text-charcoal focus:border-charcoal/30 outline-none transition-colors appearance-none">
                  <option>Order Enquiry</option>
                  <option>Styling Advice</option>
                  <option>Wholesale</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.4em] uppercase text-stone block mb-2">Message</label>
                <textarea rows={4} className="w-full bg-off-white border border-subtle p-4 text-charcoal focus:border-charcoal/30 outline-none transition-colors" />
              </div>
            </div>
            <button className="w-full bg-charcoal text-paper-white py-4 text-xs tracking-[0.3em] uppercase font-bold hover:bg-off-white hover:text-charcoal border border-charcoal transition-all duration-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </InfoLayout>
  );
}
