import React, { useState, useEffect } from 'react';
import SwapIcon from './swapicon';
import isoCountries from 'iso-3166-1-alpha-2';



export default function Form() {
  const [data, setData] = useState([]);
  const [sourceCountry, setSourceCountry] = useState('India');
  const [targetCountry, setTargetCountry] = useState('United States');
  const [salary, setSalary] = useState('100000');
  const [outputAmount, setOutputAmount] = useState('');
  // const [conversionRate, setConversionRate] = useState('');


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

    setOutputAmount(targetAmount.toFixed());
  }

  useEffect(() => {
    getCountryAndPPPData();
  }, []);

  useEffect(() => {
    calculatePPP();
  }, [sourceCountry, targetCountry, salary]);

  // useEffect(() => {
  //   calculatePPP();

  //   const sourcePPP = data?.[sourceCountry]?.[Math.max(...Object.keys(data?.[sourceCountry]).map((x) => parseInt(x)))] || 1;
  //   const targetPPP = data?.[targetCountry]?.[Math.max(...Object.keys(data?.[targetCountry]).map((x) => parseInt(x)))] || 1;

  //   const initialOutputAmount = (Number(salary) / sourcePPP) * targetPPP;
  //   setOutputAmount(initialOutputAmount);
  // }, [sourceCountry, targetCountry, salary]);



  const handleFlip = () => {
    if ((sourceCountry && !targetCountry) || (!sourceCountry && targetCountry)) {
      setSourceCountry(targetCountry);
      setTargetCountry(sourceCountry);
    }
    else if (sourceCountry && targetCountry) {
      const tempSourceCountry = sourceCountry;
      setSourceCountry(targetCountry);
      setTargetCountry(tempSourceCountry);
    }
  };



  return (
    <div>
      <form className='w-[50vw] ml-10 p-6 bg-white rounded ring-2 ring-blue-200 '>
        <SwapIcon onClick={handleFlip} />
        <div className='mb-4 w-full'>
          <label
            htmlFor='sourceCountry'
            className='block text-gray-700 font-semibold mb-2'
          >
            Source Country:
          </label>
          <select
            className='w-full p-2 border rounded-md drop-shadow-lg'
            onChange={handleSourceCountryChange}
            value={sourceCountry}
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
            value={salary}
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
            value={targetCountry}
          >
            <option value=''>Select Target Country</option>
            {Object.keys(data).filter((country) => country !== sourceCountry).map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor='outputAmount' className='block text-gray-700 font-semibold mb-2'>
          Output:
        </label>
        <input
          type='text'
          id='outputAmount'
          className='w-full p-2 border rounded-md shadow-sm'
          value={outputAmount}
          readOnly
        />
      </form>

      {/* Display the country codes */}
      <div className="ml-10 mt-5">
        <div className="bg-blue-100 inline-block p-4 rounded-md">
          <p className="text-black">
            You require a salary of{' '}
            <strong>
            <span id="targetCountryCode">
                {isoCountries.getCode(targetCountry)}
              </span>{' '}
              <span id="targetAmount">{outputAmount}</span>
            </strong>{' '}
            in{' '}
            <strong>
              <span id="targetCountryName">{targetCountry}</span>'s{' '}
            </strong>{' '}
            to live a similar quality of life as you would with a salary of{' '}
            <strong>
            <span id="sourceCountryCode">
                {isoCountries.getCode(sourceCountry)}
              </span>{' '}
              <span id="sourceAmountLabel">{salary}</span>
            </strong>{' '}
            in{' '}
            <strong>          
              <span id="sourceCountryLabel">{sourceCountry}</span>'s{' '}
            </strong>.
          </p>
        </div>
      </div>

      {/* <div className="ml-10 mt-5">
        <div className="bg-blue-100 inline-block p-4 rounded-md">
          <p className='text-black'>You require a salary of <strong>  <span id="targetAmount">{outputAmount}</span></strong> in <strong> <span id="targetCountryName">{targetCountry}</span>'s </strong>  to live a similar
            quality of life as you would with a salary of <strong> <span id="sourceAmountLabel">{salary}</span></strong> in <strong><span id="sourceCountryLabel">{sourceCountry}</span></strong>. </p>
        </div>
      </div> */}

      {/* Display the conversion rate */}
      {/* {outputAmount} */}
      {/* {conversionRate && <div>Conversion Rate: {conversionRate}</div>} */}
    </div>


  );
}