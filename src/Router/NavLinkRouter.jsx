import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import TexCalculator from '../pages/TaxCalculator'
import App from '../App'
import NotFound from '../components/NotFound'

export const router =createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App/>} errorElement={<NotFound/>} />
            <Route path="/tax" element={<TexCalculator/>} errorElement={<NotFound/>} />
           
            {/* <Route ele={NotFound} /> */}
        </Route>
    )
)
