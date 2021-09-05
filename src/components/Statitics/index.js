import {Component} from 'react'
import './index.css'

class Statitics extends Component {
  state = {
    data: [],
    main: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {statesList} = this.props
    const apiUrl = 'https://data.covid19india.org/v4/min/data.min.json'

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const obj1 = statesList.map(each => {
      const data1 = fetchedData[each.state_code]
      const {total, meta} = data1
      return {
        stateName: each.state_name,
        confirmed: total.confirmed,
        active: total.confirmed - total.recovered - total.deceased,
        recovered: total.recovered,
        deceased: total.deceased,
        population: meta.population,
      }
    })
    obj1.sort()
    this.setState({
      data: obj1,
      main: obj1[1],
    })
  }

  render() {
    const {data, main} = this.state
    console.log(data)
    const {confirmed, active, recovered, deceased} = main

    return (
      <div>
        <div className="present_status_container">
          <div className="status_container container1">
            <div className="present_1 status_1">
              <h1 className="confirmed_heading1">Confirmed</h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624083133/Group_vhxg1q.png"
                alt="confirm_img"
                className="confirmed_img"
              />
              <h1 className="confirmed_stats">
                {Intl.NumberFormat('en-IN').format(confirmed)}
              </h1>
            </div>
            <div className="present_1 status_2">
              <h1 className="active_heading1">Active</h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087222/protection_1_kpk3ao.png"
                alt="active_img"
                className="confirmed_img"
              />
              <h1 className="active_stats">
                {Intl.NumberFormat('en-IN').format(active)}
              </h1>
            </div>
          </div>
          <div className="status_container">
            <div className="present_1 status_3">
              <h1 className="recovered_heading1">Recovered</h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087301/Vector_1_x3rdrj.png"
                alt="recovered_img"
                className="confirmed_img"
              />
              <h1 className="recovered_stats">
                {Intl.NumberFormat('en-IN').format(recovered)}
              </h1>
            </div>
            <div className="present_1 status_4">
              <h1 className="deseased_heading1">Deseased</h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087279/breathing_1_tgywmk.png"
                alt="deceased_img"
                className="confirmed_img"
              />
              <h1 className="deceased_stats">
                {Intl.NumberFormat('en-IN').format(deceased)}
              </h1>
            </div>
          </div>
        </div>
        <div className="container_present">
          <div className="statics_states_container">
            <div className="statics_states_headings">
              <div className="state_ui">
                <h1 className="heading_states">States/UT</h1>
                <img
                  src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624106614/Color_Fill_kogjmw.png"
                  alt="icon1"
                  className="icon1_state"
                />
                <img
                  src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624106515/Color_Fill_cbysag.png"
                  alt="icon2"
                  className="icon2_state"
                />
              </div>
              <h1 className="heading_states confirmed_1">Confirmed</h1>
              <h1 className="heading_states">Active</h1>
              <h1 className="heading_states">Recovered</h1>
              <h1 className="heading_states">Deseased</h1>
              <h1 className="heading_states1">Population</h1>
            </div>
            <hr className="horizontal_line" />
            <ul className="unorder_list">
              {data.map(each => (
                <li className="each_state_container">
                  <p className="statePara1">{each.stateName}</p>
                  <p className="statePara2">{each.confirmed}</p>
                  <p className="statePara3">{each.active}</p>
                  <p className="statePara4">{each.recovered}</p>
                  <p className="statePara5">{each.deceased}</p>
                  <p className="statePara6">{each.population}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer_section">
          <img
            src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624017239/COVID19INDIA_yojxlk.png"
            alt="covid19_logo2"
            className="covid19_logo2"
          />
          <p className="footer_para">
            we stand with everyone fighting on the front lines
          </p>
          <div className="footer_section_logos">
            <img
              src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624171954/Vector_2_rzepam.png"
              alt="github_logo"
              className="github_logo"
            />
            <img
              src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624171795/instagram_v3s3tq.png"
              alt="insta_logo"
              className="insta_logo"
            />
            <img
              src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624171908/path3611_zkrjfo.png"
              alt="twitter_logo"
              className="twitter_logo"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Statitics
