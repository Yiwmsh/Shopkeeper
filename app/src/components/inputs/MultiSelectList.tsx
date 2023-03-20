import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { identifiableObject } from '../../types/identifiableObject';

const MultiSelectListContainer = styled.div`
  display: flex;
`;

const MultiSelectListEntry = styled(motion.button)<{ selected?: boolean }>``;

export interface MultiSelectListProps {
  entries: identifiableObject[];
}

export const MultiSelectList: React.FC<MultiSelectListProps> = ({
  entries,
}) => {
  return <></>;
};
