import React from "react";

const TransactionsList = (props) => {
    if(props.transactions.length > 0){
        return(
            <div className='right'>
                <h4>User Transactions</h4>
                <table className="customers">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Rewards</th>
                </tr>

                </thead>
                <tbody>
                {props.transactions.map((item) => {
                    
                        return <tr key={item.id}>
                        <td>{item["date"]}</td>
                        <td>{item["amount"]}</td>
                        <td>{calRew(item["amount"])}</td>
                        </tr>

                })}
                </tbody>
            </table>

        </div>

        )
        }
}

export default TransactionsList;

function calRew(price) {
    let rewards = 0;
    if (price > 100) {
      rewards = (price - 100) * 2;
    }
    if (price > 50) {
      rewards = rewards + 50;
    }
    return rewards;
  
  }