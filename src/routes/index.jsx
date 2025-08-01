import { createBrowserRouter } from "react-router-dom"

const  router = createBrowserRouter([
  {
    path:'/',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <Dashboard />
      </div>
    </div>
    
   </section>
   </>
  },
  {
    path:'/login',
   element: 
   <Login/>
  },
  {
    path:'/sign-up',
   element: 
   <SignUp/>
  },
    {
    path:'/products',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <Products />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/homeSlider/list',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <HomeSliderBanners />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/category/list',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <CategoryList />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/subCategory/list',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <SubCategoryList />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/users',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <Users />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/orders',
   element: 
   <>
   <section className="main">
    <Header/>
    <div className="contentMain flex">
      <div  

      className={`sidebarWrapper overflow-hidden
        ${isSidebarOpen===true?'w-[18%]':'w-[0px] opacity-0  '}
        transition-all
        `}
      >
        <Sidebar/>
      </div>
      <div className={`contentRight py-4 px-5  ${isSidebarOpen===false?'w-[100%]':'w-[82%]'} `} >
        <Orders />
      </div>
    </div>
    
   </section>
   </>
  },
    {
    path:'/forgot-password',
   element: 
   <ForgotPassword/>
  },
    {
    path:'/verify-account',
   element: 
   <VerifyAccount/>
  },
      {
    path:'/change-password',
   element: 
   <ChangePassword/>
  },



])  


export default router