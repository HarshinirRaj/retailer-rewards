import React, { useState, useEffect, Fragment, useCallback } from 'react';
import AddTransaction from './components/AddTransaction';
import './App.css';

import TransactionsList from './components/TransactionsList';
import UserRewards from './components/UserRewards';

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formVisibilityHandler = () => {
    setShowForm(!showForm);
  };

  const fetchTransactionsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://retailer-rewards-default-rtdb.firebaseio.com/transactions.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      console.log("fetched transactions: ", data);

      const loadedTransactions = [];

      for (const key in data) {
        loadedTransactions.push({
          id: key,
          user: data[key].user,
          date: data[key].date,
          amount: data[key].amount
        });
      }

      setTransactions(loadedTransactions);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTransactionsHandler();
  }, [fetchTransactionsHandler, ]);

  useEffect(() => {
    setUsers([...new Set(transactions.map(item => item.user))]);
  }, [transactions]);


  const userSelectHandler = (val) => {
    setCurrentUser(val);
    filterUserData(val)
  };

  const filterUserData = (selectedUser) => {
    const filteredUserData = transactions.filter(
    (item) => item.user === selectedUser
  );
  setFilteredUsers(filteredUserData)
  }

  async function addTransactionHandler(transaction) {
    try {
      const response = await fetch('https://retailer-rewards-default-rtdb.firebaseio.com/transactions.json', {
        method: 'POST',
        body: JSON.stringify(transaction),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction.');
      }

      // Update transactions after successful addition
      const data = await response.json();
      const newTransaction = {
        id: data.name,
        user: transaction.user,
        date: transaction.date,
        amount: transaction.amount
      };
      setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
      filterUserData(currentUser);
    } catch (error) {
      setError(error.message);
    }
  }

  let content = <p style={{ margin: "auto" }}>Found no transactions!</p>;
  let rewardsContent = <p style={{ margin: "auto" }}>Found no rewards!</p>;

  if (filteredUsers.length > 0) {
    content = <TransactionsList transactions={filteredUsers}/>;
    rewardsContent = <UserRewards transactions={filteredUsers} user={currentUser}/>;
  }

  if (error) {
    content = <p>{error}</p>;
    rewardsContent = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Retailer Rewards</h2>
      <div className='layout'>
        <div className='user'>
          <h3> User :</h3>
          <select onChange={e => userSelectHandler(e.target.value)} value={currentUser} >
            <option value="" disabled>Select User</option>
            {users.map((item, index) => {
              return (
                <option key={index} value={item}> {item.toUpperCase()} </option>
              );
            })}
          </select>
        </div>
        <div>
          <p className='link' onClick={formVisibilityHandler}>Add Transaction</p>
          <h5>Rewards are calculated for only Jan, Feb and Mar</h5>
          {showForm && <AddTransaction onAddTransaction={addTransactionHandler} user={currentUser}
            formVisibilityHandler={formVisibilityHandler} />}
        </div>
        <div className='content'>
          {content}
          {rewardsContent}
        </div>
      </div>
    </div>
  );
}

export default App;
