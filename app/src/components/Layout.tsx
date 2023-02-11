import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router-dom';

const Navbar = styled.nav`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;

const Navlist = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  text-align: center;
`;

const NavItem = styled(motion.li)`
  font-size: 2em;
  display: inline-block;
  flex: 1;
  border: 1px solid black;
  line-height: 2em;
`;

const NavElement: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  const navigate = useNavigate();
  return <NavItem onClick={() => navigate(link)}>{title}</NavItem>;
};

export const Layout: React.FC = () => {
  return (
    <div>
      <Navbar>
        <Navlist>
          <NavElement link="/items" title="Items" />
          <NavElement link="/sets" title="Sets" />
          <NavElement link="/stores" title="Stores" />
        </Navlist>
      </Navbar>
      <Outlet />
    </div>
  );
};
