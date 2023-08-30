import { configureStore } from '@reduxjs/toolkit'

import childrenReducer from './reducers/ChildReducer'
import workersReducer from './reducers/WorkersReducer'


const store = configureStore({
	reducer: {
		children: childrenReducer,
		workers: workersReducer,
	}
})
console.log(store)

export default store