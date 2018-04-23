import isEmpty from '../utils/is-empty'
import { SET_USER } from '../actions/types'

const initialState = {
  isAuthed: false,
  user: {}
}

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      isAuthed: !isEmpty(action.payload),
      user: action.payload
    }
  default:
    return state
  }
}
