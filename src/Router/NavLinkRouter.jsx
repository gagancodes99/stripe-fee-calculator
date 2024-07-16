import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import TexCalculator from '../pages/TaxCalculator'
import App from '../App'

export const router =createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App/>} />
            <Route path="/tax" element={<TexCalculator/>} />
           
            {/* <Route ele={NotFound} /> */}
        </Route>
    )
)
