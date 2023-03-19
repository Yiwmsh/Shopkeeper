import { SemanticColors } from '@chrisellis/react-carpentry';
import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export interface ButtonProps {
  buttonType?: 'neutral' | 'destructive' | 'constructive';
  children?: React.ReactNode;
  onClick?: () => void;
  styles?: SerializedStyles;
}

const ButtonBase = styled(motion.button)<{
  buttonType: 'neutral' | 'destructive' | 'constructive';
  styles?: SerializedStyles;
}>`
  background-color: var(
    ${({ buttonType }) => {
      switch (buttonType) {
        case 'neutral':
          return SemanticColors.altText;
        case 'constructive':
          return SemanticColors.secondary;
        case 'destructive':
          return SemanticColors.error;
      }
    }}
  );
  color: var(
    ${({ buttonType }) =>
      buttonType === 'neutral' ? SemanticColors.text : SemanticColors.altText}
  );
  border: none;
  padding: 5px 10px;
  ${({ styles }) => styles ?? ''}
`;

export const Button: React.FC<ButtonProps> = ({
  buttonType = 'neutral',
  children,
  onClick,
  styles,
}) => {
  const whileHover = () => {
    switch (buttonType) {
      case 'constructive':
        return {
          backgroundColor: `var(${SemanticColors.secondaryActive})`,
        };
      case 'destructive':
        return {
          filter: `contrast(2)`,
        };
      case 'neutral':
        return {
          backgroundColor: `var(${SemanticColors.primaryActive})`,
          color: `var(${SemanticColors.altText})`,
        };
    }
  };
  const whileTap = () => {
    switch (buttonType) {
      case 'constructive':
        return {
          backgroundColor: `var(${SemanticColors.secondaryDisabled})`,
        };
      case 'destructive':
        return {};
      case 'neutral':
        return {
          backgroundColor: `var(${SemanticColors.primaryDisabled})`,
          color: `var(${SemanticColors.altText})`,
        };
    }
  };
  return (
    <ButtonBase
      onClick={onClick}
      buttonType={buttonType}
      whileHover={whileHover()}
      whileTap={whileTap()}
      transition={{ duration: 0.2 }}
      styles={styles}
    >
      {children}
    </ButtonBase>
  );
};
