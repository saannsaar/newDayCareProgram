import { configureStore } from '@reduxjs/toolkit'

import childrenReducer from './reducers/ChildReducer'
import workersReducer from './reducers/WorkersReducer'
import currentuserReducer from './reducers/CurrentUser'
import groupReducer from './reducers/GroupReducer'
import DaycareReducer from './reducers/DaycareReducer'
import EventReducer from './reducers/EventReducer'
import userTypeReducer from './reducers/UserType'

const store = configureStore({
	reducer: {
		children: childrenReducer,
		workers: workersReducer,
		currentUser: currentuserReducer,
		events: EventReducer,
		groups: groupReducer,
		daycare: DaycareReducer,
		usertype: userTypeReducer,

	}
})
console.log(store)

export default store