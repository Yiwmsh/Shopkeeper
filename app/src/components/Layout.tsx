import { SemanticColors } from '@chrisellis/react-carpentry';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Navbar = styled.nav`
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  margin-bottom: 10px;
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
  border: 1px solid var(${SemanticColors.text});
  line-height: 2em;
`;

const NavElement: React.FC<{ title: string; link: string }> = ({
  title,
  link,
}) => {
  const location = useLocation();
  const [isActive, setIsActive] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsActive(location.pathname === link);
  }, [location]);

  return (
    <NavItem
      onClick={() => navigate(link)}
      initial={{ backgroundColor: `var(${SemanticColors.background})` }}
      animate={{
        backgroundColor: isActive
          ? `var(${SemanticColors.primary})`
          : `var(${SemanticColors.background})`,

        color: isActive
          ? `var(${SemanticColors.altText})`
          : `var(${SemanticColors.text})`,
      }}
      whileHover={{
        backgroundColor: `var(${SemanticColors.primaryActive})`,
        color: `var(${SemanticColors.altText})`,
      }}
      whileTap={{
        backgroundColor: `var(${SemanticColors.primaryDisabled})`,
        color: `var(${SemanticColors.altText})`,
      }}
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
