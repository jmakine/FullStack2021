export const addedNotification = (message) => {    
    return {
          type: 'ADDED',
          data: message
        }
}

export const votedNotification = (message) => {
    return {
        type: 'VOTED',
        data: message
    }
}

export const hideNotification = (message) => {
    return {
        type: 'HIDE',
        data: message
    }
}
    
const reducer = (state = '', action) => {
    switch(action.type) {
      case 'ADDED':
        return 'Added: ' + action.data
      case 'VOTED':
        return 'Voted: ' + action.data
      case 'HIDE':
          return ''
      default:
        return state
    }
}

export default reducer