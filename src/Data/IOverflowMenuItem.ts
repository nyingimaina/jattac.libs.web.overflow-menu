import { ReactNode } from 'react';

export default interface IOverflowMenuItem {
  content: ReactNode;
  onClick?: () => void;
  children?: IOverflowMenuItem[];
  visible?: boolean | (() => boolean) | (() => Promise<boolean>);
  enabled?: boolean | (() => boolean) | (() => Promise<boolean>);
}
