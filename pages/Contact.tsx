
import React, { useState, FormEvent } from 'react';
import emailjs from 'https://esm.sh/@emailjs/browser@^3.11.0';

// Provided EmailJS Credentials
const EMAILJS_PUBLIC_KEY = "VGwzQfR6tSmLMomts"; 
const EMAILJS_SERVICE_ID = "service_a1wgn84"; 
const EMAILJS_TEMPLATE_ID = "template_1n15a8o"; 

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Map form state to EmailJS template variables
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'sharifulislamheogeug@gmail.com', // Updated target email
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset status to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Delivery failed with status: " + result.status);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      // Reset status to idle after 5 seconds to allow retry
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-12 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/20 blur-3xl rounded-full"></div>
        
        <h2 className="text-3xl font-bold text-sky-400 mb-2 relative">Get In Touch</h2>
        <p className="text-gray-400 mb-8 font-light relative">
          Messages will be delivered directly to <span className="text-sky-300 font-medium">sharifulislamheogeug@gmail.com</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
          <div className="space-y-2">
            <label className="text-xs font-black text-sky-400/60 uppercase tracking-[0.2em]">Full Name</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-sky-400/60 uppercase tracking-[0.2em]">Email Address</label>
            <input 
              required
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-sky-400/60 uppercase tracking-[0.2em]">Your Message</label>
            <textarea 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How can I help you?"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-all resize-none placeholder:text-gray-600"
            ></textarea>
          </div>

          <button 
            disabled={status === 'loading'}
            className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 active:scale-95 shadow-lg shadow-sky-900/20"
          >
            {status === 'loading' ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <span className="flex items-center gap-2">
                SEND TO GMAIL
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            )}
          </button>
        </form>

        {status === 'success' && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm text-center animate-in fade-in slide-in-from-bottom-2">
            ✨ Success! Your message has been sent to sharifulislamheogeug@gmail.com
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            Send failed. Please verify your EmailJS setup or try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
