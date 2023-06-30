// Write your code here
import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails, onStarred} = props
  const {id, customer, slot, isStarred} = appointmentDetails

  const clickStarred = () => {
    onStarred(id)
  }

  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formatDate = format(new Date(slot), 'dd MMMM yyyy, EEEE')

  return (
    <li className="list-container">
      <div className="name-section">
        <p className="heading">{customer}</p>
        <button
          data-testid="star"
          className="button"
          type="button"
          onClick={clickStarred}
        >
          <img className="star-image" alt="star" src={imageUrl} />
        </button>
      </div>
      <p className="date">Date: {formatDate}</p>
    </li>
  )
}

export default AppointmentItem
