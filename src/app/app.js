import React from 'react';

import AppForm from 'app/appForm.js';
import TaxPayerTab from 'app/taxPayerTab/taxPayerTab.js';
import TaxCalculator from 'services/taxCalculator.js';

import './app.less';


const App = props => {
  return (
    <div className="app">
      <h1>Kalkulačka daně z příjmů fyzických osob pro rok {TaxCalculator.getYear()}</h1>
      <AppForm {...props} />
      <TaxPayerTab {...props} />
    </div>
  );
};


export default App;
