import {Component} from 'react'
import EachState from '../EachState'
import './index.css'

class StatesList extends Component {
  state = {
    clicking: '',
  }

  render() {
    const {clicking} = this.state
    const {filterStates} = this.props
    return (
      <ul className="search_states_container">
        {filterStates.map(each => (
          <EachState data={each} />
        ))}
      </ul>
    )
  }
}

export default StatesList
