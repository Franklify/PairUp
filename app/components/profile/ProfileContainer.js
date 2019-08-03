import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { navToChangeAvatar, navToChangePassword } from '../../actions/authActions'

import Profile from './Profile'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    navToChangeAvatar,
    navToChangePassword
  }, dispatch)
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default ProfileContainer
