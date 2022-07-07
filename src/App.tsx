import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import './App.sass';
import { bankIdentifierList } from './helper/BankIdentifierList';

function App() {
  const [bankIdentifier, setBankIdentifier] = useState<number>()
  const [accountNumber, setAccountNumber] = useState<string>('')
  const [iban, setIban] = useState<string>()  

  const handleBankIdentifier = (e: any, newValue: any) => {
    setBankIdentifier(newValue.bankId)
  }  

  const handleAccountNumber = (e: any) => {
    setAccountNumber(e.target.value)
  }  

  const calculateIBAN = () => {
    const countryCode: string = 'HR'
    // Convert HR to 1727 => H = 17, R = 27
    const convertAplhaToNumeric: string = '1727' + '00'
    const concatInputs: string = String(bankIdentifier) + accountNumber + convertAplhaToNumeric
    // Split into two parts - 11 and 12
    const splitNumber: string[] = concatInputs.split((/(\d{11})(\d{12})/));
    // Calculate the modulo 97 from the first part
    const firstRemainder: number = parseInt(splitNumber[1]) % 97
    // Calculate the modulo 97 from the second part
    const secondRemainder: number = parseInt(String(firstRemainder + splitNumber[2])) % 97    
    // Calculate the check number
    const checkNumber: number = (97 + 1) - secondRemainder

    // Concat to IBAN format
    const IBAN: string = String(checkNumber).length === 1 ? countryCode + '0' + checkNumber + bankIdentifier + accountNumber : countryCode + checkNumber + bankIdentifier + accountNumber
    console.log('IBAN', IBAN);
    
    setIban(IBAN)
  }
  
  return (
    <div className="app">

      <div className="titleContainer">
        <h1 className="title">IBAN kalkulator</h1>
      </div>

      <div className="inputContainer">
        {/* Bank identifier */}
        <Autocomplete
          className='autocomplete'
          disablePortal
          id="combo-box-demo"
          options={bankIdentifierList}
          renderInput={(params) => <TextField {...params} label="Odaberite vodeći broj banke" />}
          onChange={handleBankIdentifier}
          />
        {/* Account number */}
        <TextField 
          className='textField' 
          id="outlined-basic" 
          label="Unesite broj računa" 
          variant="outlined"
          onChange={handleAccountNumber}
        />
        <Button className="calculateBtn" variant="outlined" size="large" onClick={calculateIBAN}>Izračunajte</Button>
      </div>
      <div className={iban === undefined ? "ibanContainer" : "ibanContainer show"}>
        {iban}
      </div>
    </div>
  );
}

export default App;