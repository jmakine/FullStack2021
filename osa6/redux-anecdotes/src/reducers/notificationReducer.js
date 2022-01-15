let timeoutId = -1
export const setNotification = (message, time) => {
    return async dispatch => {
        clearTimeout(timeoutId)
        const show = () => {
            dispatch({
                type: 'MESSAGE',
                data: message
            })
        }
        const hide = () => {
            dispatch({
                type: 'HIDE',
                data: ''
            })
        }
        show()
        const newTideoutId = setTimeout(hide, time*1000)
        timeoutId = newTideoutId    
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
      case 'MESSAGE':
        return action.data
      case 'HIDE':
        return action.data
      default:
        return state
    }
}

export default reducer