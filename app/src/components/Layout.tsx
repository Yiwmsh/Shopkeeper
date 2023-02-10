import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

const Navbar = styled.nav`
  width: 100vw;
`;

export const Layout: React.FC = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
};
