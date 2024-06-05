import { useState } from 'react';
import './App.css'
import Checkbox from './components/Checkbox';

function App() {
  const [passwordGen, setPasswordGen] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });

  const [inputs, setInputs] = useState([]);

  const [handleText, setHandleText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPasswordGen({
      ...passwordGen,
      uppercase: !passwordGen.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPasswordGen({
      ...passwordGen,
      lowercase: !passwordGen.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPasswordGen({
      ...passwordGen,
      numbers: !passwordGen.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPasswordGen({
      ...passwordGen,
      symbols: !passwordGen.symbols,
    });
  };

  const setPasswordLength = (val) => {
    setPasswordGen({
      ...passwordGen,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = passwordGen;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(''));
      setInputs([...inputs, { password: characters.join('') }]);
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div className='wrapper'>
      <div className='container'>
        <h2>Password Generator</h2>
        <div className='input-group mb-3'>
          <input className='form-control' type='text' value={handleText} onChange={(e) => {
            setHandleText(e.target.value);
          }} readOnly />
          <button className='btn btn-secondary' onClick={() => {
            if (handleText.length > 0) {
              navigator.clipboard.writeText(handleText);
              setCopied(true);
              setInterval(() => {
                setCopied(false);
              }, 2000);
            }
          }}>{copied ? 'Copied!' : 'Copy Text'}</button>
        </div>
        <br />
        <div className='input-group mb-3'>
          <input className='form-control' type='number' min='4' max='50' value={passwordGen.length} onChange={(e) => setPasswordLength(e.target.value)} />
          <span className='input-group-text'>Password lenght</span>
        </div>
        <div className='form-check'>
          <label className='form-check-label'>Include uppercase letters</label>
          <Checkbox value={passwordGen.uppercase} onChange={handleChangeUppercase} />
        </div>
        <div className='form-check'>
          <label className='form-check-label'>Include lowercase letters</label>
          <Checkbox value={passwordGen.lowercase} onChange={handleChangeLowercase} />
        </div>
        <div className='form-check'>
          <label className='form-check-label'>Include numbers</label>
          <Checkbox value={passwordGen.numbers} onChange={handleChangeNumbers} />
        </div>
        <div className='form-check'>
          <label className='form-check-label'>Include symbols</label>
          <Checkbox value={passwordGen.symbols} onChange={handleChangeSymbols} />
        </div>
        <br />
        <div>
          <button className='btn btn-primary btn-gen' onClick={generatePassword}>Generate password</button>
        </div>
        <hr></hr>
        <div id='passwordLog'>
          {inputs.toReversed().map((input, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                {input.password}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
