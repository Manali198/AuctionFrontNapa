import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateNft from '../Components/createnft/createnft'
import Navbar from '../Components/navbar/navbar'
import MakeBid from '../Components/Bid/makebid'
import Nav from '../Components/fetch/fetchnft'

const Router = () => {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
            <Routes>

            <Route path='/Nav' element={<Nav />}/>
            <Route path='/' element={<CreateNft />}/>
            <Route path='/makeBid' element={<MakeBid />}/>

            </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Router
