import React, { useState, useEffect } from 'react';

export default function Form() {
  const [data, setData] = useState([]);
  const [sourceCountry, setSourceCountry] = useState('');
  const [targetCountry, setTargetCountry] = useState('');
  const [salary, setSalary] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [conversionRate, setConversionRate] = useState('');

  function formatOutputAmount(amount) {
    return Number(amount).toFixed(2);
  }


  const handleSourceCountryChange = (event) => {
    setSourceCountry(event.target.value);
  };

  const handleTargetCountryChange = (event) => {
    setTargetCountry(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };


  const WORLD_BANK_DATA_INDEX = 1;
  // let SourcePPP = 0;
  // let TargetPPP = 0;
  // let PPPData;
  async function getCountryAndPPPData() {
    const year = new Date().getFullYear();
    try {
      const response = await fetch(
        `https://api.worldbank.org/v2/en/country/all/indicator/PA.NUS.PPP?format=json&per_page=20000&source=2&date=${year - 5}:${year}`
      );
      const data = await response.json();
      const arr = data[WORLD_BANK_DATA_INDEX].filter((x) => x.value != null)
        .map((x_1) => {
          return { country: x_1.country.value, date: x_1.date, ppp: x_1.value };
        })
        .reduce((acc, curr) => {
          return Object.assign(Object.assign({}, acc), {
            [curr.country]: Object.assign(
              Object.assign({}, acc[curr.country] || []),
              { [curr.date]: curr.ppp }
            ),
          });
        }, {});

      setData(arr);

      console.log(arr, 'arr');
    } catch {
      console.log(`Failed to retrieve country & PPP data`);
      return {};
    }
  }

  function calculatePPP(text) {
    // const sourceCountry = $('#sourceCountry').val();
    // const targetCountry = $('#targetCountry').val();
    // updateCountryText();

    const SourcePPP =
      data?.[sourceCountry]?.[
        Math.max(...Object.keys(data?.[sourceCountry]).map((x) => parseInt(x)))
      ];
    const TargetPPP =
      data?.[targetCountry]?.[
        Math.max(...Object.keys(data?.[targetCountry]).map((x) => parseInt(x)))
      ];
    // updateTargetAmount();

    const targetAmount = (Number(salary) / SourcePPP) * TargetPPP;

    setOutputAmount(targetAmount);
  }

  useEffect(() => {
    getCountryAndPPPData();
  }, []);

  useEffect(() => {
    calculatePPP();
  }, [sourceCountry, targetCountry, salary]);

  return (
    <div>
      <form className='max-w-m mx-auto p-6 bg-white rounded ring-2 ring-blue-200 '>
        {/* ring-2 ring-blue-200  */}
        <div className='mb-4'>
          <label
            htmlFor='sourceCountry'
            className='block text-gray-700 font-semibold mb-2'
          >
            Source Country:
          </label>
          <select
            className='w-full p-2 border rounded-md drop-shadow-lg'
            onChange={handleSourceCountryChange}
          >
            <option value=''>Select Source Country</option>
            {Object.keys(data).map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='salary'
            className='block text-gray-700 font-semibold mb-2'
          >
            Salary:
          </label>
          <input
            type='text'
            id='salary'
            className='w-full p-2 border rounded-md shadow-sm'
            onChange={handleSalaryChange}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='targetCountry'
            className='block text-gray-700 font-semibold mb-2'
          >
            Target Country:
          </label>
          <select
            className='w-full p-2 border rounded-md shadow-sm'
            onChange={handleTargetCountryChange}
          >
            <option value=''>Select Target Country</option>
            {Object.keys(data).map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        {/* <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Submit
        </button> */}
         <label htmlFor='outputAmount' className='block text-gray-700 font-semibold mb-2'>
            Output:
          </label>
        <input
            type='text'
            id='outputAmount'
            className='w-full p-2 border rounded-md shadow-sm'
            value={formatOutputAmount(outputAmount)}
            readOnly
          />
         
      </form>

      
      <div className="text-center mt-5">
        <div className="bg-blue-100 inline-block p-4 rounded-md">
          <p>You require a salary of <strong>  <span id="targetAmount">{outputAmount}</span></strong> in <strong> <span id="targetCountryName">{targetCountry}</span>'s </strong> local currency to live a similar
            quality of life as you would with a salary of <strong> <span id="sourceAmountLabel">{salary}</span></strong> in <strong><span id="sourceCountryLabel">{sourceCountry}</span>'s </strong>local currency. </p>
        </div>
      </div>

      {/* Display the conversion rate */}
      {/* {outputAmount} */}
      {conversionRate && <div>Conversion Rate: {conversionRate}</div>}
    </div>

    
  );
}