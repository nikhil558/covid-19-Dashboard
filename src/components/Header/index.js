import {Link, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Header extends Component {
  state = {
    stylingHome: 'nav-home',
    stylingAbout: 'nav-about',
    value: false,
  }

  onHomeClicked = () => {
    this.setState({
      stylingHome: 'nav-home',
      stylingAbout: 'nav-about',
    })
  }

  onAboutClicked = () => {
    this.setState({
      stylingHome: 'highlight_home',
      stylingAbout: 'highlight_about',
    })
  }

  onLogoClick = () => {
    this.setState({value: true})
  }

  render() {
    const {stylingHome, stylingAbout, value} = this.state
    if (value) {
      return <Redirect to="/" />
    }
    return (
      <nav className="nav-header">
        <div className="blog-container">
          <img
            className="covid19Logo"
            src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624017239/COVID19INDIA_yojxlk.png"
            alt="logo"
            onClick={this.onLogoClick}
          />
          <ul className="nav-menu">
            <Link to="/">
              <li className={stylingHome} onClick={this.onHomeClicked}>
                Home
              </li>
            </Link>
            <Link to="/about">
              <li className={stylingAbout} onClick={this.onAboutClicked}>
                About
              </li>
            </Link>
          </ul>
          <img
            src="https://res.cloudinary.com/dsqwm3c9a/image/upload/v1624083162/add-to-queue_1_c5imtj.png"
            className="dropdown_btn"
            alt="dropdown"
          />
        </div>
      </nav>
    )
  }
}

export default Header
