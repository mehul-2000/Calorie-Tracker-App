import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Dashboard, Register, Landing, Error } from './pages'
import { getMeals } from './actions/meal'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMeals())
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
