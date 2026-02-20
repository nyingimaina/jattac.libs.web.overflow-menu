import { ReactNode } from 'react';

type CommonProps = {
  content: ReactNode;
  visible?: boolean | (() => boolean) | (() => Promise<boolean>);
  enabled?: boolean | (() => boolean) | (() => Promise<boolean>);
};

type ActionItem = CommonProps & {
  onClick: () => void;
  children?: never;
};

type SubmenuItem = CommonProps & {
  onClick?: () => void;
  children: IOverflowMenuItem[];
};

type IOverflowMenuItem = ActionItem | SubmenuItem;

export default IOverflowMenuItem;
