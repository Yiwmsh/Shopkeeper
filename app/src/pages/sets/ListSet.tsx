import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ItemSet } from './itemSet';

const ListItemButton = styled(motion.button)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 0;
  border: none;
  margin-bottom: 5px;
  height: 2em;
`;

export const ListSet: React.FC<{ set: ItemSet }> = ({ set }) => {
  return <></>;
};
