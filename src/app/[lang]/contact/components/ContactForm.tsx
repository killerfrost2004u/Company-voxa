"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { sendContactEmail } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  lang: 'en' | 'ar';
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await sendContactEmail(formData);
      if (result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 space-y-4 animate-fade-in-up">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">
          {lang === 'en' ? 'Message Sent Successfully!' : 'تم إرسال الرسالة بنجاح!'}
        </h3>
        <p className="text-muted">
          {lang === 'en' 
            ? "Thank you for reaching out. Our engineering team will get back to you shortly." 
            : "شكراً لتواصلك معنا. سيقوم فريقنا الهندسي بالرد عليك قريباً."}
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-accent hover:underline font-semibold"
        >
          {lang === 'en' ? 'Send another message' : 'إرسال رسالة أخرى'}
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground ml-1">
            {lang === 'en' ? 'Full Name' : 'الاسم الكامل'}
          </label>
          <input 
            type="text" 
            name="name"
            required
            placeholder={lang === 'en' ? 'John Doe' : 'أحمد محمد'}
            className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-background transition-all"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground ml-1">
            {lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
          </label>
          <input 
            type="email" 
            name="email"
            required
            placeholder={lang === 'en' ? 'john@example.com' : 'ahmed@example.com'}
            className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-background transition-all"
          />
        </div>
      </div>

      {/* Service Type */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground ml-1">
          {lang === 'en' ? 'What do you need help with?' : 'بم يمكننا مساعدتك؟'}
        </label>
        <select 
          name="service"
          className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-foreground focus:outline-none focus:border-accent/50 focus:bg-background transition-all appearance-none cursor-pointer"
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          defaultValue=""
          required
        >
          <option value="" disabled>{lang === 'en' ? 'Select a service...' : 'اختر خدمة...'}</option>
          <option value="Web/E-Commerce">{lang === 'en' ? 'Web Platform / E-Commerce' : 'منصة ويب / تجارة إلكترونية'}</option>
          <option value="Custom AI">{lang === 'en' ? 'Custom AI & Machine Learning' : 'ذكاء اصطناعي مخصص'}</option>
          <option value="ERP">{lang === 'en' ? 'ERP / Enterprise Software' : 'أنظمة ERP للمؤسسات'}</option>
          <option value="Automation">{lang === 'en' ? 'Workflow Automation' : 'أتمتة سير العمل'}</option>
          <option value="Other">{lang === 'en' ? 'Other' : 'أخرى'}</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground ml-1">
          {lang === 'en' ? 'Message' : 'الرسالة'}
        </label>
        <textarea 
          name="message"
          rows={5}
          required
          placeholder={lang === 'en' ? 'Tell us about your project...' : 'حدثنا عن مشروعك...'}
          className="w-full bg-background/50 border border-white/10 rounded-2xl px-6 py-4 text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 focus:bg-background transition-all resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">
          {lang === 'en' ? 'Something went wrong. Please try again.' : 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'}
        </p>
      )}

      {/* Submit Button */}
      <Button 
        type="submit"
        disabled={isSubmitting}
        variant="action"
        size="lg"
        className="w-full mt-4 rounded-2xl gap-2"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            {lang === 'en' ? 'Send Message' : 'إرسال الرسالة'}
            <Send className={`w-5 h-5 ${lang === 'ar' ? 'scale-x-[-1]' : ''}`} />
          </>
        )}
      </Button>

    </form>
  );
}
