import { useState } from 'react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    revenue: '',
    situation: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitMutation = trpc.contact.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Пожалуйста, введите ваше имя');
      return;
    }
    if (!formData.contact.trim()) {
      toast.error('Пожалуйста, введите телефон или Telegram');
      return;
    }
    if (!formData.revenue.trim()) {
      toast.error('Пожалуйста, укажите оборот бизнеса');
      return;
    }

    try {
      // Send to backend via tRPC
      await submitMutation.mutateAsync({
        name: formData.name,
        contact: formData.contact,
        revenue: formData.revenue,
        situation: formData.situation,
        timestamp: new Date().toISOString(),
      });

      toast.success('Спасибо! Мы свяжемся с вами в ближайшее время.');
      
      // Reset form
      setFormData({
        name: '',
        contact: '',
        revenue: '',
        situation: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую.');
      
      // Provide fallback contact info
      toast.info('Email: zugrov@gmail.com | Telegram: @maxima_CFO_light');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input 
        type="text" 
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ваше имя" 
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
        disabled={submitMutation.isPending}
      />
      <input 
        type="text" 
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder="Телефон или Telegram" 
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
        disabled={submitMutation.isPending}
      />
      <input 
        type="text" 
        name="revenue"
        value={formData.revenue}
        onChange={handleChange}
        placeholder="Оборот бизнеса в год (примерно)" 
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600"
        disabled={submitMutation.isPending}
      />
      <textarea 
        name="situation"
        value={formData.situation}
        onChange={handleChange}
        placeholder="Кратко опишите вашу ситуацию" 
        rows={3}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-600 resize-none"
      />
      <button 
        type="submit" 
        disabled={submitMutation.isPending}
        className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {submitMutation.isPending ? 'Отправка...' : 'Записаться на диагностику'}
      </button>
    </form>
  );
}
