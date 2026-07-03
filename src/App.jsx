import { useEffect, useState } from 'react'
import { FaExchangeAlt, FaCoins } from 'react-icons/fa'
import './App.css'

function App() {
  const [curvalue, setcurvalue]=useState(0)
  const [curfrom, setcurfrom]=useState("USD")
  const [curto, setcurto]=useState("PKR")
  const [convertedamt, setconvertedamt]=useState(0)
  const [currencyOptions, setCurrencyOptions] = useState({});

  function currencyapi() {
    return fetch(`https://v6.exchangerate-api.com/v6/3ab1434ffa6e52989dc878c5/latest/${curfrom}`)
    .then((res) => res.json())
    .then((data) => data.conversion_rates);
  }

  useEffect(()=>{
      currencyapi().then((currencyOptions) => {
      setCurrencyOptions(currencyOptions)
    });
  },[curfrom])
  // if(currencyOptions!=={}){
  //   console.log(currencyOptions["PKR"]);
  // }
  function convert(){
    // console.log(c])
    console.log(curvalue)
    console.log(currencyOptions[curto])
    setconvertedamt(curvalue*currencyOptions[curto])
  }

  useEffect(()=>{
    convert()
  },[curvalue,curto, currencyOptions])

  function swap(){
    const temp = curfrom;
    setcurfrom(curto);
    setcurto(temp);
    // setcurvalue(0)
  }

  const rate = currencyOptions[curto]
  const ready = Object.keys(currencyOptions).length > 0

  return (
    <div className="app-screen">

      {/* decorative blurred background orbs */}
      <div className="orb orb-1" aria-hidden="true"></div>
      <div className="orb orb-2" aria-hidden="true"></div>
      <div className="orb orb-3" aria-hidden="true"></div>

      <div className="card-glow" aria-hidden="true"></div>

      <div className="converter-card">

        <header className="card-header">
          <div className="title-row">
            <span className="title-icon"><FaExchangeAlt /></span>
            <h1 className="card-title">Currency Converter</h1>
          </div>
          <p className="card-subtitle">Convert currencies instantly using live exchange rates.</p>
        </header>

        <div className="field-group">
          <label className="field-label" htmlFor="amount-input">Amount</label>
          <input
            id="amount-input"
            className="amount-input"
            type="number"
            value={curvalue}
            onChange={(e)=>{setcurvalue(Number(e.target.value))}}
            placeholder="0.00"
          />
        </div>

        <div className="currency-row">
          <div className="currency-field">
            <label className="field-label" htmlFor="cur-from">From</label>
            <select
              className="currency-select"
              name="CurrencyFrom"
              id="cur-from"
              value={curfrom}
              onChange={(e)=>{setcurfrom(e.target.value)}}
            >
              {Object.keys(currencyOptions).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <button id="swapbtn" className="swap-btn" onClick={swap} aria-label="Swap currencies">
            <FaExchangeAlt className="swap-icon" />
          </button>

          <div className="currency-field">
            <label className="field-label" htmlFor="cur-to">To</label>
            <select
              className="currency-select"
              name="CurrencyTo"
              id="cur-to"
              value={curto}
              onChange={(e)=>{setcurto(e.target.value)}}
            >
              {Object.keys(currencyOptions).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="result-section" role="status">
          {!ready ? (
            <span className="result-loading">Fetching live rates&hellip;</span>
          ) : (
            <>
              <span className="result-label">
                <FaCoins className="result-label-icon" />
                Converted Amount
              </span>
              <div className="result-value">
                {convertedamt < 1 ? convertedamt.toFixed(4) : convertedamt.toFixed(2)}
                <span className="result-currency">{curto}</span>
              </div>
              <div className="result-equation">
                {curvalue} {curfrom} &nbsp;&rarr;&nbsp; {curto}
              </div>
              {rate && (
                <div className="rate-footnote">
                  1 {curfrom} = {rate.toFixed(4)} {curto}
                </div>
              )}
            </>
          )}
        </div>

        <footer className="card-footer">Made with ❤️ By: Wareesha Faheem</footer>

      </div>
    </div>
  )
}

export default App