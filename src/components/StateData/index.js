import {Component} from 'react'
import './index.css'
import Header from '../Header'
import Barchat from '../Barchat'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class StateData extends Component {
  state = {
    confirmed: [],
    active: [],
    recovered: [],
    deseased: [],
    topDistricts: [],
    spreadTreads: [],
    barChatData: [],
    eachBarChat: [],
    showing: false,
    totalStateData1: [],
  }

  componentDidMount() {
    this.getData()
    this.eachStateData()
  }

  getData = async () => {
    const {match} = this.props
    const apiUrl = 'https://data.covid19india.org/v4/min/data.min.json'
    const {params} = match
    const {state} = params

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const obj1 = statesList.filter(each => each.state_name === state)
    const data1 = fetchedData[obj1[0].state_code]
    const {districts} = await data1
    const districts1 = Object.keys(districts)
    const {meta} = data1
    const totalStateData = {
      stateName: state,
      confirmed: data1.total.confirmed,
      active:
        data1.total.confirmed - data1.total.recovered - data1.total.deceased,
      tested: data1.total.tested,
      recovered: data1.total.recovered,
      deceased: data1.total.deceased,
      population: data1.meta.population,
      lastUpdate: meta.tested.date,
    }

    const confirmedData = districts1.map(each => {
      const {total} = districts[each]
      const newObj = {}
      newObj.district = each
      newObj.data = total.confirmed
      return newObj
    })
    confirmedData.sort((a, b) => b.data - a.data)

    const activeData = districts1.map(each => {
      const {total} = districts[each]
      const newObj = {}
      newObj.district = each
      newObj.data = total.confirmed - total.recovered - total.deceased
      return newObj
    })
    activeData.sort((a, b) => b.data - a.data)

    const recoveryData = districts1.map(each => {
      const {total} = districts[each]
      const newObj = {}
      newObj.district = each
      newObj.data = total.recovered
      return newObj
    })
    recoveryData.sort((a, b) => b.data - a.data)

    const deseasedData = districts1.map(each => {
      const {total} = districts[each]
      const newObj = {}
      newObj.district = each
      newObj.data = total.deceased
      return newObj
    })
    deseasedData.sort((a, b) => b.data - a.data)

    this.setState({
      confirmed: confirmedData,
      active: activeData,
      recovered: recoveryData,
      deseased: deseasedData,
      topDistricts: confirmedData,
      totalStateData1: totalStateData,
    })
  }

  eachStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {state} = params
    const obj1 = statesList.filter(each => each.state_name === state)
    const api = `https://data.covid19india.org/v4/min/timeseries-${obj1[0].state_code}.min.json`
    const options = {
      method: 'GET',
    }
    const response = await fetch(api, options)
    const fetchedData = await response.json()
    const fetchedData1 = fetchedData[obj1[0].state_code].dates

    const threeMonths = []
    const n = 90

    ;[...Array(n)].map((elementInArray, index) =>
      threeMonths.push(
        Object.entries(fetchedData1)[
          Object.entries(fetchedData1).length - index
        ],
      ),
    )

    const tenDays = []
    const n1 = 11

    ;[...Array(n1)].map((elementInArray, index) =>
      tenDays.push(
        Object.entries(fetchedData1)[
          Object.entries(fetchedData1).length - index
        ],
      ),
    )
    threeMonths.shift()
    threeMonths.shift()

    tenDays.shift()
    tenDays.reverse()

    const dataList1 = threeMonths.map(each => ({
      date: each[0],
      confirmed: each[1].delta.confirmed,
      active:
        each[1].delta.confirmed -
        each[1].delta.recovered -
        each[1].delta.deceased,
      deceased: each[1].delta.deceased,
      recovered: each[1].delta.recovered,
      tested: each[1].delta.tested,
      vaccinated1: each[1].delta.vaccinated1,
    }))

    const dataList2 = tenDays.map(each => ({
      date: each[0],
      confirmed: each[1].total.confirmed,
      active:
        each[1].total.confirmed -
        each[1].total.recovered -
        each[1].total.deceased,
      deceased: each[1].total.deceased,
      recovered: each[1].total.recovered,
      tested: each[1].total.tested,
      vaccinated1: each[1].total.vaccinated1,
    }))

    const data1 = dataList2.map(each => ({
      date: each.date,
      count: each.confirmed,
    }))

    this.setState({
      spreadTreads: dataList1,
      barChatData: dataList2,
      showing: true,
    })
  }

  recoveryClick = () => {
    const {recovered, barChatData} = this.state
    const data4 = barChatData.map(each => ({
      date: each.date,
      count: each.recovered,
    }))
    this.setState({topDistricts: recovered, eachBarChat: data4})
  }

  confirmClicked = () => {
    const {confirmed, barChatData} = this.state
    const data1 = barChatData.map(each => ({
      date: each.date,
      count: each.confirmed,
    }))

    this.setState({topDistricts: confirmed, eachBarChat: data1})
  }

  activeClick = () => {
    const {active, barChatData} = this.state
    const data2 = barChatData.map(each => ({
      date: each.date,
      count: each.active,
    }))
    this.setState({topDistricts: active, eachBarChat: data2})
  }

  deseasedClick = () => {
    const {deseased, barChatData} = this.state
    const data3 = barChatData.map(each => ({
      date: each.date,
      count: each.deceased,
    }))
    this.setState({topDistricts: deseased, eachBarChat: data3})
  }

  render() {
    const {
      topDistricts,
      eachBarChat,
      showing,
      spreadTreads,
      totalStateData1,
    } = this.state
    const {match} = this.props
    const {params} = match
    const {state} = params
    console.log(eachBarChat)
    return (
      <div className="state_container">
        <Header />
        <div className="container_card">
          <div className="latest-update-container">
            <h1 className="state_Heading">{state}</h1>
            <p className="lastUpdateDate">
              Last updated on {totalStateData1.lastUpdate}
            </p>
          </div>
          <div className="container_total_result">
            <p className="tested">Tested</p>
            <p className="total_tested">
              {Intl.NumberFormat('en-IN').format(totalStateData1.tested)}
            </p>
          </div>
        </div>
        <div className="present_status_container">
          <div className="status_container container1">
            <div className="present_1 status_1">
              <h1 className="confirmed_heading1" onClick={this.confirmClicked}>
                Confirmed
              </h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624083133/Group_vhxg1q.png"
                alt="confirm_img"
                className="confirmed_img"
                onClick={this.confirmClicked}
              />
              <h1 className="confirmed_stats" onClick={this.confirmClicked}>
                {Intl.NumberFormat('en-IN').format(totalStateData1.confirmed)}
              </h1>
            </div>
            <div className="present_1 status_2">
              <h1 className="active_heading1" onClick={this.activeClick}>
                Active
              </h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087222/protection_1_kpk3ao.png"
                alt="active_img"
                className="confirmed_img"
                onClick={this.activeClick}
              />
              <h1 className="active_stats" onClick={this.activeClick}>
                {Intl.NumberFormat('en-IN').format(totalStateData1.active)}
              </h1>
            </div>
          </div>
          <div className="status_container">
            <div className="present_1 status_3">
              <h1 className="recovered_heading1" onClick={this.recoveryClick}>
                Recovered
              </h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087301/Vector_1_x3rdrj.png"
                alt="recovered_img"
                className="confirmed_img"
                onClick={this.recoveryClick}
              />
              <h1 className="recovered_stats" onClick={this.recoveryClick}>
                {Intl.NumberFormat('en-IN').format(totalStateData1.recovered)}
              </h1>
            </div>
            <div className="present_1 status_4">
              <h1 className="deseased_heading1" onClick={this.deseasedClick}>
                Deseased
              </h1>
              <img
                src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624087279/breathing_1_tgywmk.png"
                alt="deceased_img"
                className="confirmed_img"
                onClick={this.deseasedClick}
              />
              <h1 className="deceased_stats" onClick={this.deseasedClick}>
                {Intl.NumberFormat('en-IN').format(totalStateData1.deceased)}
              </h1>
            </div>
          </div>
        </div>
        <div className="top-district-container">
          <h1 className="top-district-heading">Top Districts</h1>
          <div className="top-districts">
            {topDistricts.map(each => (
              <div className="each-district">
                <p className="top-district-data">{each.data}</p>
                <p className="top-district-district">{each.district}</p>
              </div>
            ))}
          </div>
        </div>
        {showing && <Barchat spreadTreads={spreadTreads} />}
        <div className="footer_section1">
          <img
            src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624017239/COVID19INDIA_yojxlk.png"
            alt="covid19_logo2"
            className="covid19_logo2"
          />
          <p className="footer_para1">
            we stand with everyone fighting on the front lines
          </p>
          <div className="footer_section_logos1">
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

export default StateData
