import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navToHome } from '../../actions/navActions'
import { registerForPushNotificationsAsync } from '../../actions/authActions'

import About from './About'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navToHome,
    registerForPushNotificationsAsync
  }, dispatch)
}

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(About)

export default AboutContainer
