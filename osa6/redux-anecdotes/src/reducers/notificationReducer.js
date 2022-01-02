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
    
const reducer = (state = '', action) => {
    switch(action.type) {
      case 'ADDED':
        return 'Added: ' + action.data
      case 'VOTED':
        return 'Voted: ' + action.data
      default:
        return state
    }
}

export default reducer