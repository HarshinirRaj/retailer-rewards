import React from "react";

const TransactionsList = (props) => {
    if(props.transactions.length > 0){
        return(
            <div className='right'>
                <h4 className="text-theme">Transactions</h4>
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
                    const formattedDate = new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    });

                    return (
                        <tr key={item.id}>
                        <td>{formattedDate}</td>
                        <td>{item.amount}</td>
                        <td>{calRew(item.amount)}</td>
                        </tr>
                    );
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