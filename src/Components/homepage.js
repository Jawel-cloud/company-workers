import React, { useState, useContext } from 'react';
import { CheckContext } from './checkContext';
import OneWorker from './oneWorker';
const Homepage = () => {

const primeWorkers = [
  {id:"KateWilliamsHR", firstName: 'Kate', lastName: 'Williams', department: 'HR', salary:4000, currency:'EUR'},
  {id:"MichaelHankNational", firstName: 'Michael', lastName: 'Hank', department: 'National', salary:7000, currency:'USD'},
  {id:"NatalieKenethHR", firstName: 'Natalie', lastName: 'Keneth', department: 'HR', salary:3500, currency:'EUR'},
  {id:"CameronFalconInternal", firstName: 'Cameron', lastName: "Falcon", department: 'Internal', salary:3000, currency:'EUR'},
  {id:"JakeMichaelsonInternal", firstName: 'Jake', lastName: 'Michaelson', department: 'Internal', salary:2500, currency:'EUR'},
  {id:"PennyMorgeranHR", firstName: 'Penny', lastName: 'Morgeran', department: 'HR', salary:3000, currency:'USD'}
];

const unique = (array)=> {
  let a = array.concat();
  for(let i=0; i<a.length; ++i) {
      for(let j=i+1; j<a.length; ++j) {
          if(a[i].id === a[j].id)
              a.splice(j--, 1);
      }
  }
  return a;
}

let storageWorkers = localStorage.getItem("storageWorkers") !== null? JSON.parse(localStorage.getItem('storageWorkers')): primeWorkers;
    // const allWorkerswithDups = primeWorkers.concat(storageWorkers)
    // const allWorkers = unique(allWorkerswithDups);
    const allWorkers = unique(storageWorkers);
    const [workers, setWorkers] = useState(allWorkers);
    // const [counter, setCounter] =useState(6);    
    const [fName, setfName] = useState('');
    const [lName, setlName] = useState('');
    const [depart, setDepart] = useState('');
    const [salary, setSalary] = useState(0);
    const [currency, setCurrency] = useState('');
    const [addValid, setAddValid] = useState(true);

  const handleDelete =(id)=>{
      console.log('delete worker with id: '+id);
      const workersCopy = workers.filter(worker=> worker.id!==id)
      setWorkers(workersCopy);
      window.localStorage.clear();
      window.localStorage.setItem('storageWorkers', JSON.stringify(workersCopy));
    }

const handleChangefName = (e) =>{
 setfName(e.target.value);
}
const handleChangelName = (e) =>{
  setlName(e.target.value);
 }
 const handleChangeDepart = (e) =>{
  setDepart(e.target.value);
 }
 const handleChangeSalary = (e) =>{
  setSalary(e.target.value);
 }
 const handleChangeCurrency = (e) =>{
  setCurrency(e.target.value);
 }

 const handleSubmit =(e)=>{
   e.preventDefault()
   const index = workers.findIndex(worker => worker.id === fName+lName+depart)
  if (fName!=='' && lName!=='' && depart!==''&& salary>0&& currency!==''&& index===-1){
    const newWorker = {
      id: fName+lName+depart,
      firstName:fName,
      lastName:lName,
      department:depart,
      salary:parseInt(salary),
      currency:currency
    }
    const workersNew = [...workers, newWorker];
    setWorkers(workersNew);
    window.localStorage.clear();
    window.localStorage.setItem('storageWorkers', JSON.stringify(workersNew));
    // setCounter(counter+1);
    setAddValid(true);
    setfName('');
    setlName('');
    setDepart('');
    setSalary(0);
    setCurrency('');
  }else{
    setAddValid(false);
  }
 }




//context
const {fNameSearch, lNameSearch, departSearch, salaryFromSearch,
    salaryToSearch, currencySearch, togglefNameSearch, togglelNameSearch, toggleDepartSearch,
    toggleSalaryFromSearch, toggleSalaryToSearch, toggleCurrencySearch} = useContext(CheckContext); 

 const handleChangefNameSearch = (e) =>{
  togglefNameSearch(e.target.value);
 }
 const handleChangelNameSearch = (e) =>{
   togglelNameSearch(e.target.value);
  }
  const handleChangeDepartSearch = (e) =>{
   toggleDepartSearch(e.target.value);
  }
  const handleChangeSalaryFromSearch = (e) =>{
   toggleSalaryFromSearch(e.target.value);
  }
  const handleChangeSalaryToSearch = (e) =>{
   toggleSalaryToSearch(e.target.value);
  }
  const handleChangeCurrencySearch = (e) =>{
   toggleCurrencySearch(e.target.value);
  }



    const workersCopy = [...workers];
    const workersAfterFNameSearching = fNameSearch!==''?
    workersCopy.filter(worker=>worker.firstName.includes(fNameSearch)) : workersCopy;
    const workersAfterLNameSearching = lNameSearch!==''?
    workersAfterFNameSearching.filter(worker=>worker.lastName.includes(lNameSearch)) : workersAfterFNameSearching;
    const workersAfterDepartmentSearching = departSearch!==''?
    workersAfterLNameSearching.filter(worker=>worker.department.includes(departSearch)) : workersAfterLNameSearching;
    const workersAfterSalaryFromSearching = salaryFromSearch!==0?
    workersAfterDepartmentSearching.filter(worker=>worker.salary>=salaryFromSearch) : workersAfterDepartmentSearching;
    const workersAfterSalaryToSearching = salaryToSearch!==10000?
    workersAfterSalaryFromSearching.filter(worker=>worker.salary<=salaryToSearch) : workersAfterSalaryFromSearching;
    const workersAfterCurrencySearching = currencySearch!==''?
    workersAfterSalaryToSearching.filter(worker=>worker.currency.includes(currencySearch)) : workersAfterSalaryToSearching;
    const companyWorkers = workersAfterCurrencySearching.map(worker=> <OneWorker key={worker.id} worker={worker} delete={handleDelete}/>)


    const workersUSD = workersAfterCurrencySearching.filter(worker=>worker.currency.includes('USD'));
    const workersEUR = workersAfterCurrencySearching.filter(worker=>worker.currency.includes('EUR'));
    const workersGBP = workersAfterCurrencySearching.filter(worker=>worker.currency.includes('GBP'));

    const sumFunction =(table)=>{
        let sum = 0;
        for(let i=0; i<table.length; i++){
            sum=sum+table[i].salary
        }
        return sum;
    }
    const companyWorkersSumUSD = sumFunction(workersUSD);
    const companyWorkersSumEUR = sumFunction(workersEUR);
    const companyWorkersSumGBP = sumFunction(workersGBP);

  return (
    <>
    <div className='siteWrapper'>
      {/* <h1>Company</h1> */}
    <div className='mainSiteWrapper'>
      <div className='formsWrapper'>
    <form onSubmit={handleSubmit} noValidate className='formAdd'> 
      <h2>Add New Person</h2>
      <label htmlFor='firstName'>First Name: 
      <input type='text' id='firstName' value={fName} onChange={handleChangefName} /></label>
      <label htmlFor='lastName'>Last Name: 
      <input type='text' id='lastName' value={lName} onChange={handleChangelName} /></label>
      <label htmlFor='department'>Department:
        <select id='department' value={depart} onChange={handleChangeDepart}>
          <option value=''>--Choose--</option>
          <option value='HR'>HR</option>
          <option value='Internal'>Internal</option>
          <option value='External'>External</option>
          <option value='National'>National</option>
        </select>
      </label>
      <label htmlFor='salary'>Salary: 
      <input type='number' id='salary' value={salary} onChange={handleChangeSalary} /></label>
      <label htmlFor='curr'>Currency: 
        <select id='curr' value={currency} onChange={handleChangeCurrency}>
        <option value=''>---</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
        </select>
      </label>
      <button>Add</button>
      <div className='validInfo'>{addValid? null: 'Type valid information in all fields'}</div>
    </form>
    

    <form className='formSearch'>
      <h2>Filters</h2>
      <label htmlFor='fNameSearch'>First Name: 
      <input type='text' id='fNameSearch'value={fNameSearch} onChange={handleChangefNameSearch} /></label>
      <label htmlFor='lNameSearch'>Last Name: 
      <input type='text' id='lNameSearch'value={lNameSearch} onChange={handleChangelNameSearch} /></label>
      <label htmlFor='departmentSearch'>Department: 
        <select id='departmentSearch' value={departSearch} onChange={handleChangeDepartSearch}>
          <option value=''>--Choose--</option>
          <option value='HR'>HR</option>
          <option value='Internal'>Internal</option>
          <option value='External'>External</option>
          <option value='National'>National</option>
        </select>
      </label>
      <label htmlFor='salaryRangeFrom'>Salary range: <br/>{salaryFromSearch}
      <input type='range' id='salaryRangeFrom' name='salaryRangeFrom' min='0' max='10000'
      value={salaryFromSearch} onChange={handleChangeSalaryFromSearch}></input>
      </label>
      <label htmlFor='salaryRangeTo'>{salaryToSearch}
      <input type='range' id='salaryRangeTo' name='salaryRangeTo' min='0' max='10000'
      value={salaryToSearch} onChange={handleChangeSalaryToSearch}></input>
      </label>
      <label htmlFor='curr'>Currency: 
        <select id='curr' value={currencySearch} onChange={handleChangeCurrencySearch}>
        <option value=''>---</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
          <option value='GBP'>GBP</option>
        </select>
      </label>
    </form>

    <div className='workersImg'></div>

    </div>

    <div className='workerList'>
      <h2>Company People</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name </th>
                    <th>Last Name </th> 
                    <th>Department </th>
                    <th>Salary</th> 
                    <th>Delete</th> 
                </tr>
            </thead>
            <tbody>{companyWorkers}</tbody>
            <tfoot>
                <tr><td className='empty'></td><td className='empty'></td>
                <td className='sum'>Summary USD</td><td className='sum'>{companyWorkersSumUSD} USD</td></tr>
                <tr><td className='empty'></td><td className='empty'></td>
                <td className='sum'>Summary EUR</td><td className='sum'>{companyWorkersSumEUR} EUR</td></tr>
                <tr><td className='empty'></td><td className='empty'></td>
                <td className='sum'>Summary GBP</td><td className='sum'>{companyWorkersSumGBP} GBP</td></tr>
            </tfoot>
        </table>
    </div>
    </div>
    </div>
    </>
  );
}
 
export default Homepage;