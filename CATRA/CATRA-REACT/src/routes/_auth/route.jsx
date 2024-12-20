import { createFileRoute, Outlet } from '@tanstack/react-router'
import authGuard from 'src/util/authGuard'
import Header from 'src/components/auth/Header';
import Sidebar from 'src/components/auth/Sidebar';
import { useState } from 'react';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    console.log('CONTEXTO BEFORE LOAD /AUTH', context);
    authGuard(context, { location, url: '/login' });
  },
  component: AuthLayout
});

function AuthLayout() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main style={{
        gridArea: 'main',
        overflowY: 'auto',
        padding: '20px 20px',
      }}>
        <Outlet />
      </main>
    </div>
  )
}
