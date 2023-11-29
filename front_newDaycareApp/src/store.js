import { configureStore } from '@reduxjs/toolkit'

import childrenReducer from './reducers/ChildReducer'
import workersReducer from './reducers/WorkersReducer'
import currentuserReducer from './reducers/CurrentUser'
import groupReducer from './reducers/GroupReducer'
import DaycareReducer from './reducers/DaycareReducer'
import EventReducer from './reducers/EventReducer'
import userTypeReducer from './reducers/UserType'
import caretimeReducer from './reducers/CaretimeReducer'
import currentChildReducer from './reducers/CurrentChild'
import NotificationReducer from './reducers/NotificationReducer'
import messageReducer from './reducers/MessageReducer'
import conversationsReducer from './reducers/ConversationsReducer'
import errorReducer from './reducers/errorReducer'

const store = configureStore({
	reducer: {
		children: childrenReducer,
		workers: workersReducer,
		currentUser: currentuserReducer,
		events: EventReducer,
		groups: groupReducer,
		daycare: DaycareReducer,
		usertype: userTypeReducer,
		caretimes: caretimeReducer,
		currentChild: currentChildReducer,
		notifications: NotificationReducer,
		messages: messageReducer,
		conversations: conversationsReducer,
		errors: errorReducer,
	}
})
console.log(store)

export default store