import { configureStore } from '@reduxjs/toolkit'

import childrenReducer from './reducers/ChildReducer'
import workersReducer from './reducers/WorkersReducer'
import currentuserReducer from './reducers/CurrentUser'
import groupReducer from './reducers/GroupReducer'

import EventReducer from './reducers/EventReducer'

const store = configureStore({
	reducer: {
		children: childrenReducer,
		workers: workersReducer,
		currentUser: currentuserReducer,
		events: EventReducer,
		groups: groupReducer,
	}
})
console.log(store)

export default store