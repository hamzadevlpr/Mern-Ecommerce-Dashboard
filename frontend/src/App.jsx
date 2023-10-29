import { Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard/Dashboard"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import Products from "./components/Products/Products"
import AddProduct from "./components/Products/AddProduct"
import { Toaster } from 'react-hot-toast';
import EditProduct from "./components/Products/EditProduct"
import Cartegory from "./components/Category/Cartegory"



function App() {
  document.title = "Dashboard | Ecommerce WorldWide"
  return (
    <>
      <Sidebar />
      <Header />
      <div className="max-w-6xl mx-auto px-12">
        <Routes>
          <Route path='/' element={<Dashboard title="Dashboard" />} />
          <Route path='/dashboard' element={<Dashboard title="Dashboard" />} />
          <Route path='/products' element={<Products title="Product Gallery" />} />
          <Route path="/edit/:productId" element={<EditProduct />} />
          <Route path='/products/add' element={<AddProduct title="Add Product" />} />
          <Route path='/category' element={<Cartegory title="Categories" />} />
        </Routes>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,

        }}
      />
    </>
  )
}

export default App
