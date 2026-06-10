import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Parallax translation for the big text
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "30%"]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        {
          publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setIsSubmitting(false);
          setSubmitStatus('success');
          formRef.current.reset();
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          setIsSubmitting(false);
          setSubmitStatus('error');
          console.error('FAILED...', error.text);
          setTimeout(() => setSubmitStatus(null), 5000);
        }
      );
  };

  return (
    <section ref={ref} id="contact" className="bg-[#0B0C10] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-t from-[#ff416c]/10 to-transparent blur-[150px] pointer-events-none z-0"></div>

      {/* Huge Background Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-center overflow-hidden pointer-events-none z-0 pt-16 md:pt-12 opacity-40"
      >
        <h1 
          className="text-[25vw] leading-[0.75] font-black text-transparent uppercase tracking-tighter select-none scale-y-[1.6] origin-top [-webkit-text-stroke:2px_#333]"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
        >
          Contact
        </h1>
      </motion.div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        <div 
          data-aos="fade-up"
          className="bg-[#15161c]/80 backdrop-blur-3xl border border-white/10 border-b-0 border-r-0 w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-white flex flex-col justify-between rounded-tl-[3rem] shadow-[-10px_-10px_30px_rgba(0,0,0,0.4)]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 border-b border-white/10 pb-8">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[#ff416c] mb-6 md:mb-0">
              Reach Us
            </div>
            <div className="text-sm font-medium text-gray-300 md:text-right">
              <p className="mb-1"><a href="mailto:latheeshvalmeti226@gmail.com" className="hover:text-white hover:underline transition-colors">latheeshvalmeti226@gmail.com</a></p>
              <p className="mb-4 text-white">+91-9110788265</p>
              <div className="flex gap-6 md:justify-end">
                <a href="https://linkedin.com/in/valmeti-latheesh" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff416c] transition-colors uppercase text-xs font-bold tracking-wider">LinkedIn</a>
                <a href="https://github.com/Latheesh560" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff416c] transition-colors uppercase text-xs font-bold tracking-wider">GitHub</a>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-12 md:gap-16 w-full">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <div className="flex-1 flex flex-col gap-10">
                <div className="relative group pt-4">
                  <input 
                    type="text" 
                    id="firstName" 
                    name="user_firstname"
                    required
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-[#ff416c] transition-colors font-medium rounded-none text-white"
                  />
                  <label htmlFor="firstName" className="absolute left-0 top-4 text-gray-500 text-lg font-medium transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff416c] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400 pointer-events-none">First Name</label>
                </div>
                <div className="relative group pt-4">
                  <input 
                    type="text" 
                    id="lastName" 
                    name="user_lastname"
                    required
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-[#ff416c] transition-colors font-medium rounded-none text-white"
                  />
                  <label htmlFor="lastName" className="absolute left-0 top-4 text-gray-500 text-lg font-medium transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff416c] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400 pointer-events-none">Last Name</label>
                </div>
                <div className="relative group pt-4">
                  <input 
                    type="email" 
                    id="email" 
                    name="user_email"
                    required
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-[#ff416c] transition-colors font-medium rounded-none text-white"
                  />
                  <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-lg font-medium transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff416c] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400 pointer-events-none">Email</label>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col group pt-4">
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    placeholder=" " 
                    className="peer w-full h-full min-h-[120px] bg-transparent border-b border-white/20 pb-3 text-lg focus:outline-none focus:border-[#ff416c] transition-colors font-medium resize-none rounded-none text-white"
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-lg font-medium transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#ff416c] peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-gray-400 pointer-events-none">Type your message here...</label>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row gap-12 mt-4">
              {/* Left text */}
              <div className="flex-1 flex items-start gap-4 text-sm font-medium text-gray-400">
                <input 
                  type="checkbox" 
                  id="permission" 
                  className="mt-1 w-4 h-4 rounded-sm border-white/20 bg-transparent text-[#ff416c] focus:ring-[#ff416c] focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" 
                  style={{ accentColor: "#ff416c" }}
                />
                <label htmlFor="permission" className="cursor-pointer max-w-[280px] leading-snug">
                  I give permission to contact me at this email address.
                </label>
              </div>

              {/* Right text & button */}
              <div className="flex-1 flex flex-col gap-8 text-xs text-gray-500 font-medium">
                <p className="leading-relaxed max-w-[400px]">
                  This site is protected by reCAPTCHA and the Google <a href="#" className="underline hover:text-white transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-white transition-colors">Terms of Service</a> apply.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
                  <p className="max-w-[250px] leading-relaxed">
                    For information on how to unsubscribe, please review our <a href="#" className="underline hover:text-white transition-colors">privacy policy</a>.
                  </p>
                  
                  <div className="flex flex-col items-center sm:items-end gap-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white font-bold flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(255,65,108,0.5)] transition-all duration-300 group whitespace-nowrap self-start sm:self-auto hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      {!isSubmitting && (
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                    {submitStatus === 'success' && (
                      <p className="text-green-500 text-sm font-medium">Message sent successfully!</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-red-500 text-sm font-medium">Failed to send. Please try again.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
