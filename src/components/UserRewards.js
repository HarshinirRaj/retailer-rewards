import React, { useEffect, useState } from "react";

const UserRewards = (props) => {
  const [calcRewards, setCalcRewards] = useState({});

  useEffect(() => {

    let monthData = {
        1: {
          amounts: [],
          rewards: 0,
        },
        2: {
          amounts: [],
          rewards: 0,
        },
        3: {
          amounts: [],
          rewards: 0,
        },
      };

    for (let i = 0; i < props.transactions.length; i++) {
      let month = new Date(props.transactions[i]["date"]);
      if (
        month.getMonth() + 1 === 1 ||
        month.getMonth() + 1 === 2 ||
        month.getMonth() + 1 === 3
      ) {
        monthData[month.getMonth() + 1]["amounts"].push(
            props.transactions[i]["amount"]
        );
      }
    }
    for (let key in monthData) {
      let total_month_rewards = 0;
      for (let i = 0; i < monthData[key]["amounts"].length; i++) {
        let price = monthData[key]["amounts"][i];

        total_month_rewards = total_month_rewards + calRew(price);
      }
      monthData[key]["rewards"] = total_month_rewards;
    }
    setCalcRewards({ ...monthData });
  }, [props.transactions, props.user]);

  return (
        <div className="left">
            <h4 className="text-theme"> Rewards</h4>
          <table className="customers">
            <thead>
              <tr>
                <th>Month</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>First Month</td>
                <td>{calcRewards[1]?.rewards}</td>
              </tr>
              <tr>
                <td>Second Month</td>
                <td>{calcRewards[2]?.rewards}</td>
              </tr>
              <tr>
                <td>Third Month</td>
                <td>{calcRewards[3]?.rewards}</td>
              </tr>
              <tr>
                <td>Total Reward</td>
                <td>
                  {calcRewards[1]?.rewards +
                    calcRewards[2]?.rewards +
                    calcRewards[3]?.rewards}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
  );
};

function calRew(price) {
  let rewards = 0;
  if (price > 100) {
    rewards = (price - 100) * 2;
  }
  if (price > 50 ) {
    rewards = rewards + 50;
  }
  return rewards;
}

export default UserRewards;
