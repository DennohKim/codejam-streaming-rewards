import { FC, ReactNode } from 'react';
import AppLayout from './AppLayout';

interface Props {
  children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <AppLayout>{children}</AppLayout>
    </>
  );
};

export default Layout;
