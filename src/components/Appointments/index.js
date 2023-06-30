// Write your code here
import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointments: [], name: '', date: '', isActive: false}

  onClickFilter = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  onStarred = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachStar => {
        if (eachStar.id === id) {
          return {...eachStar, isStarred: !eachStar.isStarred}
        }
        return eachStar
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()

    const {name, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      customer: name,
      slot: date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      name: '',
      date: '',
    }))
  }

  enterName = event => {
    this.setState({name: event.target.value})
  }

  bookDate = event => {
    this.setState({date: event.target.value})
  }

  getFilteredList = () => {
    const {appointments, isActive} = this.state

    if (isActive) {
      return appointments.filter(eachStar => eachStar.isStarred === true)
    }
    return appointments
  }

  render() {
    const {name, date, isActive} = this.state
    const changeClassName = isActive ? 'starred-button' : 'unstar-button'

    const filteredAppointments = this.getFilteredList()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="appointment-section">
            <form className="form-section" onSubmit={this.addAppointment}>
              <h1 className="appointment-heading">Add Appointment</h1>
              <label htmlFor="title">TITLE</label>
              <input
                className="input"
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.enterName}
                value={name}
              />
              <label htmlFor="date">DATE</label>
              <input
                className="input"
                id="date"
                type="date"
                placeholder="dd/mm/yyyy"
                onChange={this.bookDate}
                value={date}
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              className="image"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <div className="bottom-container">
            <div className="starred-button-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                onClick={this.onClickFilter}
                className={changeClassName}
                type="button"
              >
                starred
              </button>
            </div>
            <ul className="appointment-item-container">
              {filteredAppointments.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  onStarred={this.onStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
