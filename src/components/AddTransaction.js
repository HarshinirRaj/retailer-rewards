import React, { useRef } from 'react';
import classes from './AddTransaction.module.css'

const AddTransaction = (props) => {
    const dateRef = useRef('');
    const amountRef = useRef('');
  
    function submitHandler(event) {
      event.preventDefault();
  
      const transaction = {
        user : props.user,
        date: new Date(dateRef.current.value),
        amount: amountRef.current.value,
      };
      
      props.onAddTransaction(transaction);
      props.formVisibilityHandler();
    }
  
    return (
        <div>
            <h5>Only Transactions between 01/01/2020 and 03/31/2020 will be added</h5>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                <label htmlFor='date'>Date</label>
                <input type='date' id='date' ref={dateRef} />
                </div>
                <div className={classes.control}>
                <label htmlFor='amount'>Amount</label>
                <input type="number" id='amount' ref={amountRef}></input>
                </div>
                <button>Add Transaction</button>
            </form>
      </div>
    );
}

export default AddTransaction;