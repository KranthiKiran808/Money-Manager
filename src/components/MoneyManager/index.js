import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

const intialTransactionItemList = []
class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: 'INCOME',
    transactionItemList: intialTransactionItemList,
    money: {
      balance: 0,
      income: 0,
      expenses: 0,
    },
  }

  onChangeTypeOption = event => {
    this.setState({type: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    this.setState(prevState => ({
      transactionItemList: [...prevState.transactionItemList, newTransaction],
      title: '',
      type: 'INCOME',
      amount: '',
      money: {
        balance: prevState.money.balance + parseInt(amount),
        income:
          prevState.type === 'INCOME'
            ? prevState.money.income + parseInt(amount)
            : prevState.money.income,
        expenses:
          prevState.type === 'EXPENSES'
            ? prevState.money.expenses + parseInt(amount)
            : prevState.money.expenses,
      },
    }))
  }

  onChangeInputTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeInputAmount = event => {
    this.setState({amount: event.target.value})
  }

  onDeleteTransaction = (id, type, amount) => {
    this.setState(prevState => {
      const filteredList = prevState.transactionItemList.filter(
        each => each.id !== id,
      )
      return {
        transactionItemList: filteredList,
        money: {
          balance: prevState.money.balance - parseInt(amount),
          income:
            type === 'INCOME'
              ? prevState.money.income - parseInt(amount)
              : prevState.money.income,
          expenses:
            type === 'EXPENSES'
              ? prevState.money.expenses - parseInt(amount)
              : prevState.money.expenses,
        },
      }
    })
  }

  render() {
    const {title, amount, type, transactionItemList, money} = this.state
    console.log(type)
    return (
      <div>
        <section>
          <div className="name-container">
            <h1>Hi, Richard</h1>
            <p>Welcome back to your Money Manager</p>
          </div>
        </section>
        <section>
          <MoneyDetails money={money} />
        </section>
        <section>
          <div className="transaction-add-his-container">
            <div className="transaction-container">
              <h3>Add Transaction</h3>
              <form onSubmit={this.onSubmitForm}>
                <div className="input-container">
                  <label htmlFor="title">TITLE</label>
                  <input
                    placeholder="TITLE"
                    value={title}
                    id="title"
                    onChange={this.onChangeInputTitle}
                    required
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="amount">AMOUNT</label>
                  <input
                    placeholder="AMOUNT"
                    value={amount}
                    id="amount"
                    onChange={this.onChangeInputAmount}
                    required
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="type">TYPE</label>
                  <select
                    id="type"
                    value={type}
                    onChange={this.onChangeTypeOption}
                  >
                    {/* Display the first object's displayText */}
                    <option value={transactionTypeOptions[0].optionId}>
                      {transactionTypeOptions[0].displayText}
                    </option>
                    {/* Display the second object's displayText */}
                    <option value={transactionTypeOptions[1].optionId}>
                      {transactionTypeOptions[1].displayText}
                    </option>
                  </select>
                </div>
                <div>
                  <button type="submit" className="butt">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="transaction-container container2">
              <h3>History</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th>Actions</th> {/* Optional column for delete button */}
                    </tr>
                  </thead>
                  <tbody>
                    {transactionItemList.map(eachTransaction => (
                      <TransactionItem
                        eachTransaction={eachTransaction}
                        key={eachTransaction.id}
                        onDeleteTransaction={this.onDeleteTransaction}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default MoneyManager
