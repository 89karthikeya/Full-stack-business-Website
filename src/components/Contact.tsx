import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    automationGoal: '',
    currentProcess: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || !formData.businessName.trim() || !formData.email.trim() || !formData.automationGoal) {
      setStatusMessage({
        text: 'Please fill in all required fields.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStatusMessage({
        text: 'Thanks! Your consultation request has been received.',
        type: 'success',
      });

      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        automationGoal: '',
        currentProcess: '',
      });
    } catch (error) {
      console.error('Form simulation error:', error);
      setStatusMessage({
        text: 'Something went wrong. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-apple-darkBg text-white border-t border-apple-darkBorder w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-apple-gray block mb-3">Get In Touch</span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Let's See What We Can Automate.</h2>
          <p className="text-apple-gray text-base sm:text-lg">Tell us about your business and where customer enquiries are getting stuck.</p>
        </div>

        {/* Form Card Container */}
        <div className="max-w-3xl mx-auto bg-apple-cardBg border border-apple-darkBorder rounded-3xl p-6 sm:p-12 shadow-2xl w-full">
          <form id="consultation-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-apple-gray mb-2">Name *</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full h-12 px-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm placeholder-apple-gray/50 focus:outline-none focus:border-apple-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="businessName" className="block text-xs font-medium text-apple-gray mb-2">Business Name *</label>
                <input
                  type="text"
                  id="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Apex Restoration"
                  className="w-full h-12 px-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm placeholder-apple-gray/50 focus:outline-none focus:border-apple-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-apple-gray mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full h-12 px-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm placeholder-apple-gray/50 focus:outline-none focus:border-apple-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-apple-gray mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-12 px-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm placeholder-apple-gray/50 focus:outline-none focus:border-apple-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="automationGoal" className="block text-xs font-medium text-apple-gray mb-2">What would you like to automate? *</label>
              <select
                id="automationGoal"
                required
                value={formData.automationGoal}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm focus:outline-none focus:border-apple-accent transition-colors"
              >
                <option value="" disabled>Select a main goal...</option>
                <option value="Missed-call follow-up">Missed-call follow-up</option>
                <option value="AI customer enquiries">AI customer enquiries</option>
                <option value="Lead qualification">Lead qualification</option>
                <option value="Appointment booking">Appointment booking</option>
                <option value="Custom automation">Custom automation</option>
              </select>
            </div>

            <div>
              <label htmlFor="currentProcess" className="block text-xs font-medium text-apple-gray mb-2">Current Process</label>
              <textarea
                id="currentProcess"
                rows={3}
                value={formData.currentProcess}
                onChange={handleChange}
                placeholder="Briefly describe how you currently handle customer enquiries..."
                className="w-full p-4 rounded-xl bg-apple-darkBg border border-apple-darkBorder text-white text-sm placeholder-apple-gray/50 focus:outline-none focus:border-apple-accent transition-colors resize-none"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                id="submit-btn"
                disabled={isSubmitting}
                className="w-full h-14 rounded-full bg-apple-accent hover:bg-apple-accentHover text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <span>Book a Free Consultation →</span>
                )}
              </button>
            </div>

            {/* Status message container */}
            {statusMessage && (
              <div
                id="form-message"
                className={`text-center text-sm py-3 px-4 rounded-xl ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            <p className="text-center text-xs text-apple-gray pt-2">
              No obligation. Let's discuss what could be automated.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
