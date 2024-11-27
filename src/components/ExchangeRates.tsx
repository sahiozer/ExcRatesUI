import React, { useState, useEffect } from 'react';
import API from '../services/api';

type Rate = {
  bankName: string;
  goldBuyingRate: number;
  goldSellingRate: number;
};

interface RatesResponse {
  rates: Rate[];
}

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await API.get<Rate[]>('/exchange/rates');
        if (response.data) {
          setRates(response.data);
        } else {
          setError('No data received.');
        }
      } catch (err: unknown) {
       console.error('Unknown error:', err);
        setError('Failed to fetch exchange rates.');
      }
    };
  
    fetchRates();
  }, []);
  

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h1>Exchange Rates</h1>
      <table border={1} style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Bank Name</th>
            <th>Gold Buying Rate</th>
            <th>Gold Selling Rate</th>
          </tr>
        </thead>
        <tbody>
          {rates.length > 0 ? (
            rates.map((rate, index) => (
              <tr key={index}>
                <td>{rate.bankName}</td>
                <td>{rate.goldBuyingRate.toFixed(2)}</td>
                <td>{rate.goldSellingRate.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No rates available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRates;
