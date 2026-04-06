import React from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div className='h-screen p-6'>
      <Navbar />
      <div>
        {/* <AppRoutes /> */}
      </div>
    </div>
  )
}

export default App