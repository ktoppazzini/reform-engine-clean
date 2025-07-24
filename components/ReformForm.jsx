import { useState } from 'react';
import { TIERS } from '../lib/constants/tiers';
import { COMPANY_SIZES } from '../lib/constants/companySizes';
import { TIME_FRAMES } from '../lib/constants/timeFrames';
import { COUNTRIES } from '../lib/constants/countries';
import { useRouter } from 'next/router';

export default function ReformForm() {
  const router = useRouter();
  const userLang = router.pathname.includes('/fr') ? 'fr' : 'en';

  const [formData, setFormData] = useState({
    tier: '',
    companySize: '',
    timeFrame: '',
    country: '',
    savingsGoal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/submit-reform-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, lang: userLang })
    });

    alert(userLang === 'fr' ? 'Requête envoyée!' : 'Request submitted!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl">
        <img src="/logo.png" alt="Logo" className="w-32 mx-auto mb-6" />
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {userLang === 'fr' ? 'Niveau de réforme' : 'Reform Tier'}
          </label>
          <select
            name="tier"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            required
          >
            <option value="">{userLang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
            {TIERS.map(t => (
              <option key={t.id} value={t.id}>
                {userLang === 'fr' ? t.fr.name : t.en.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {userLang === 'fr' ? 'Taille de l\'entreprise' : 'Company Size'}
          </label>
          <select
            name="companySize"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            required
          >
            <option value="">{userLang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
            {COMPANY_SIZES.map((size, index) => (
              <option key={index} value={size.en}>
                {userLang === 'fr' ? size.fr : size.en}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {userLang === 'fr' ? 'Délai de rendement' : 'Time Frame'}
          </label>
          <select
            name="timeFrame"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            required
          >
            <option value="">{userLang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
            {TIME_FRAMES.map((tf, index) => (
              <option key={index} value={tf.en}>
                {userLang === 'fr' ? tf.fr : tf.en}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {userLang === 'fr' ? 'Pays' : 'Country'}
          </label>
          <select
            name="country"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            required
          >
            <option value="">{userLang === 'fr' ? 'Sélectionner...' : 'Select...'}</option>
            {COUNTRIES.map((country, index) => (
              <option key={index} value={country.en}>
                {userLang === 'fr' ? country.fr : country.en}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {userLang === 'fr' ? 'Objectif d\'économie ($)' : 'Target Savings ($)'}
          </label>
          <input
            type="number"
            name="savingsGoal"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold py-4 px-6 w-full rounded-2xl transition"
        >
          {userLang === 'fr' ? 'Générer' : 'Generate'}
        </button>
      </form>
    </div>
  );
}

