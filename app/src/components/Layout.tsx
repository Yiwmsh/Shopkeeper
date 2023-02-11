import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Outlet, useNavigate } from 'react-router-dom';

const Navbar = styled.nav`
  width: 100vw;
  position: sticky;
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
  border: 1px solid #5c6976;
  line-height: 2em;
`;

const NavElement: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <NavItem
      onClick={() => navigate(link)}
      initial={{ backgroundColor: '#708090' }}
      whileHover={{ backgroundColor: '#5C6976' }}
      whileTap={{ backgroundColor: '#8A97A4' }}
    >
      {title}
    </NavItem>
  );
};

const Page = styled.div`
  max-width: 100vw;
  overflow: hidden;
`;

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
      <Page>
        <Outlet />
      </Page>{' '}
    </div>
  );
};
