import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './App.sass';
import { bankIdentifierList } from './helper/BankIdentifierList';

function App() {
  return (
    <div className="app">
      <div className="titleContainer">
        <h1 className="title">IBAN kalkulator</h1>
      </div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={bankIdentifierList}
        renderInput={(params) => <TextField {...params} label="Bank Identifier" />}
      />
    </div>
  );
}

export default App;