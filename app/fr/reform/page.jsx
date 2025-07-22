'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReformFormFR() {
  const [organizationName, setOrganizationName] = useState('');
  const [country, setCountry] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [tier, setTier] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [costSavingsGoal, setCostSavingsGoal] = useState('');
  const [strategicGoals, setStrategicGoals] = useState('');

  const [countries, setCountries] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);
  const [tiers, setTiers] = useState([]);
  const [timeFrames, setTimeFrames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [countriesRes, sizesRes, tiersRes, timesRes] = await Promise.all([
        axios.get('/api/countries'),
        axios.get('/api/company-sizes'),
        axios.get('/api/tiers'),
        axios.get('/api/time-frames'),
      ]);

      setCountries(countriesRes.data);
      setCompanySizes(sizesRes.data);
      setTiers(tiersRes.data);
      setTimeFrames(timesRes.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/generate-pdf', {
      organizationName,
      country,
      companySize,
      tier,
      timeFrame,
      desiredOutcome,
      costSavingsGoal,
      strategicGoals,
      locale: 'fr',
    });

    alert('Demande de rapport envoyée.');
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white border border-gray-200 shadow-md rounded-xl p-10">
        <div className="text-center">
          <img src="/so-logo.png" alt="Sovereign Ops" className="mx-auto w-20 h-20 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Générateur de Rapport de Réforme</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Nom de l'organisation"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            className="input-style"
          />

          <select value={country} onChange={(e) => setCountry(e.target.value)} required className="input-style">
            <option value="">-- Sélectionnez un pays --</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} required className="input-style">
            <option value="">-- Taille de l'entreprise --</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select value={tier} onChange={(e) => setTier(e.target.value)} required className="input-style">
            <option value="">-- Niveau de réforme --</option>
            {tiers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} required className="input-style">
            <option value="">-- Délai de mise en œuvre --</option>
            {timeFrames.map((tf) => (
              <option key={tf} value={tf}>{tf}</option>
            ))}
          </select>

          <textarea
            placeholder="Résultat souhaité"
            value={desiredOutcome}
            onChange={(e) => setDesiredOutcome(e.target.value)}
            required
            className="input-style"
          />

          <input
            type="text"
            placeholder="Objectif d'économies"
            value={costSavingsGoal}
            onChange={(e) => setCostSavingsGoal(e.target.value)}
            required
            className="input-style"
          />

          <textarea
            placeholder="Objectifs stratégiques"
            value={strategicGoals}
            onChange={(e) => setStrategicGoals(e.target.value)}
            required
            className="input-style"
          />

          <button
            type="submit"
            className="w-full bg-[#0a2647] hover:bg-[#09325c] text-white py-3 px-4 rounded-lg font-semibold shadow-sm transition duration-150"
          >
            Générer le Rapport
          </button>
        </form>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          background-color: #f9fafb;
          outline: none;
          font-size: 1rem;
        }
        .input-style:focus {
          border-color: #2563eb;
          background-color: #fff;
        }
      `}</style>
    </main>
  );
}
