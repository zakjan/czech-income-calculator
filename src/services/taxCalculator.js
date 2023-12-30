const maximalIncomeForFlatExpense = 2000000;
const incomeTaxRate = 0.15;
const incomeTaxRateZone2 = 0.23;
const incomeTaxDeductionForPayer = 30840;

const socialInsuranceRate = 0.292;
const employeeSocialInsuranceRate = 0.065;
const employerSocialInsuranceRate = 0.248;
const minimalSocialInsuranceTaxableIncome = 13191 * 12; // minimální roční vyměřovací základ, https://www.cssz.cz/vyse-minimalnich-vymerovacich-zakladu-osvc
const maximalSocialInsuranceTaxableIncome = 2110416; // maximální roční vyměřovací základ, https://www.mpsv.cz/socialni-pojisteni

const sicknessInsuranceRate = 0.027;
const employeeSicknessInsuranceRate = 0.006;
const employerSicknessInsuranceRate = 0.021;
const minimalSicknessInsuranceTaxableIncome = 8000 * 12; // minimální roční vyměřovací základ, https://www.cssz.cz/web/cz/vyse-a-vypocet-davek

const healthInsuranceRate = 0.135;
const employeeHealthInsuranceRate = 0.045;
const employerHealthInsuranceRate = 0.09;
const minimalHealthInsuranceTaxableIncome = 21983.50 * 12; // minimální roční vyměřovací základ, https://www.vzp.cz/platci/informace/osvc/vymerovaci-zaklad-a-vypocet-pojistneho/jaky-je-minimalni-vymerovaci-zaklad

const incomeThresholdZone2 = 131901 * 12; // https://www.mfcr.cz/cs/ministerstvo/media/tiskove-zpravy/2023/prehledne-ktere-zmeny-prinese-rok-2024-nejen-pro-o-54178


const TaxCalculator = {
  getYear: () => {
    return 2024;
  },

  taxableExpenseFromIncomeAndExpenseAndFlatExpenseRate: (income, expense, flatExpenseRate) => {
    return Math.max(expense, Math.min(income, maximalIncomeForFlatExpense) * flatExpenseRate);
  },

  taxableIncomeFromIncomeAndExpense: (income, expense) => {
    return Math.max(income - expense, 0);
  },

  incomeTaxFromTaxableIncome: taxableIncome => {
    const roundedTaxableIncome = Math.floor(taxableIncome / 100) * 100;
    const deductions = incomeTaxDeductionForPayer;
    const incomeTaxZone1 = Math.min(roundedTaxableIncome, incomeThresholdZone2) * incomeTaxRate;
    const incomeTaxZone2 = Math.max(roundedTaxableIncome - incomeThresholdZone2, 0) * incomeTaxRateZone2;
    const incomeTax = incomeTaxZone1 + incomeTaxZone2;
    return Math.max(incomeTax - deductions, 0);
  },

  socialInsuranceFromTaxableIncome: taxableIncome => {
    const socialInsuranceTaxableBase = Math.max(Math.min(taxableIncome / 2, maximalSocialInsuranceTaxableIncome), minimalSocialInsuranceTaxableIncome);
    return socialInsuranceTaxableBase * socialInsuranceRate;
  },

  sicknessInsuranceFromTaxableIncome: taxableIncome => {
    const sicknessInsuranceTaxableBase = Math.max(taxableIncome / 2, minimalSicknessInsuranceTaxableIncome);
    return sicknessInsuranceTaxableBase * sicknessInsuranceRate;
  },

  healthInsuranceFromTaxableIncome: taxableIncome => {
    const healthInsuranceTaxableBase = Math.max(taxableIncome / 2, minimalHealthInsuranceTaxableIncome);
    return healthInsuranceTaxableBase * healthInsuranceRate;
  },

  employeeSocialInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employeeSocialInsuranceRate;
  },

  employeeSicknessInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employeeSicknessInsuranceRate;
  },

  employeeHealthInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employeeHealthInsuranceRate;
  },

  employerSocialInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employerSocialInsuranceRate;
  },

  employerSicknessInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employerSicknessInsuranceRate;
  },

  employerHealthInsuranceFromGrossSalary: grossSalary => {
    return grossSalary * employerHealthInsuranceRate;
  },
};


export default TaxCalculator;
