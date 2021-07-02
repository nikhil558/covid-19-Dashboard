import {Component} from 'react'
import Header from '../Header'
import './index.css'
import StatesList from '../StatesList'
import Statitics from '../Statitics'

class Home extends Component {
  state = {
    search: '',
    triggering: false,
  }

  searchStates = event => {
    this.setState({search: event.target.value, triggering: true})
  }

  render() {
    const {search, triggering} = this.state
    const {statesList} = this.props
    const filterStates = statesList.filter(each =>
      each.state_code.toLowerCase().includes(search.toLowerCase()),
    )

    return (
      <>
        <div className="bg_home">
          <Header />
          <input
            type="text"
            placeHolder="Enter the State"
            className="inputSearch"
            onChange={this.searchStates}
          />
          {triggering ? (
            <StatesList filterStates={filterStates} />
          ) : (
            <Statitics statesList={statesList} />
          )}
        </div>
      </>
    )
  }
}

export default Home
