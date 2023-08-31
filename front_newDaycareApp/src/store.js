import { configureStore } from '@reduxjs/toolkit'

import childrenReducer from './reducers/ChildReducer'
import workersReducer from './reducers/WorkersReducer'
import currentuserReducer from './reducers/CurrentUser'


const store = configureStore({
	reducer: {
		children: childrenReducer,
		workers: workersReducer,
		currentUser: currentuserReducer,
	}
})
console.log(store)

export default store