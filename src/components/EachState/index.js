import {Component} from 'react'
import {Redirect} from 'react-router-dom'

class EachState extends Component {
  state = {
    value: false,
  }

  clickingFun = () => {
    this.setState({value: true})
  }

  render() {
    const {data} = this.props
    const {value} = this.state
    if (value) {
      return <Redirect to={`/state/${data.state_name}`} />
    }

    return (
      <li className="each_container" onClick={this.clickingFun}>
        <p className="each_para">{data.state_name}</p>
        <div className="each_code_container">
          <p className="state_code_para">{data.state_code}</p>
          <img
            src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624257761/Line_shaydn.png"
            alt="line"
            className="line_img"
          />
        </div>
      </li>
    )
  }
}

export default EachState
