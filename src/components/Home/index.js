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
      each.state_name.toLowerCase().startsWith(search.toLowerCase()),
    )

    return (
      <>
        <div className="bg_home">
          <Header />
          <div className="inputSearchContainer">
            <img
              src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1625570531/search_ydd5ds.png"
              alt="search-icon"
              className="searchIcon"
            />
            <input
              type="search"
              placeHolder="Enter the State"
              className="inputSearch"
              onChange={this.searchStates}
            />
          </div>
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
