import {Component} from 'react'
import Header from '../Header'
import './index.css'

class About extends Component {
  state = {
    faqsData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const apiUrl = 'https://data.covid19india.org/website_data.json'

    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()

    const data = fetchedData.faq.map(each => ({
      answer: each.answer,
      category: each.category,
      qno: each.qno,
      question: each.question,
    }))

    this.setState({faqsData: data})
  }

  render() {
    const {faqsData} = this.state
    console.log(faqsData)
    return (
      <div>
        <Header />
        <div className="about_container">
          <h1 className="about_heading">About</h1>
          <p className="about_para">Last update on march 28th 2021</p>
          <h1 className="about_vaccination">
            COVID-19 vaccine ready for distribution
          </h1>
          {faqsData.map(each => (
            <div>
              <p className="question">{each.question}</p>
              <p className="answer">{each.answer}</p>
            </div>
          ))}
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
      </div>
    )
  }
}

export default About
