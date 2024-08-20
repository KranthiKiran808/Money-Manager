import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteTransaction} = props
  const {id, title, amount, type} = eachTransaction

  const onClickDeleteButton = () => {
    onDeleteTransaction(id, type, amount)
  }

  // Capitalize the first letter of the type and make the rest lowercase
  const formattedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()

  return (
    <tr className="transaction-item-container">
      <td>{title}</td>
      <td>{amount}</td>
      <td>{formattedType}</td>
      <td>
        <button
          type="button"
          onClick={onClickDeleteButton}
          className="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </td>
    </tr>
  )
}

export default TransactionItem
