import { useState } from 'react'
import { Alert, AppBar, Toolbar, Button } from '@mui/material'



import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


const App = () => {

  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
 const result = useQuery(ALL_AUTHORS)
 const books = useQuery(ALL_BOOKS)
 const client = useApolloClient()


 const logout = () => {
  setToken(null)
  localStorage.clear()
  client.resetStore()
 }

 if (result.loading || books.loading) {
  return <div>Loading...</div>
 }
 if (!token) {
  
  return (
    <div>
      <Router>

<AppBar position='static'>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
         
        </Toolbar>
      </AppBar>
     
     
    

  <Routes>
    <Route />
  </Routes>
</Router>

      
      
    </div>
  )
 }



 else return (
  <div>
    Moi
  </div>
 )
 
}

export default App