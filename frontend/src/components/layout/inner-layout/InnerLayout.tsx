import { Header, IHeaderProps } from '../../header/Header';
import { PropsWithChildren } from 'react';
import { Footer } from '../../footer/Footer';

export interface IInnerLayout extends PropsWithChildren, IHeaderProps {}

export const InnerLayout = ({ children, header }: IInnerLayout) => {
  return (
    <div className="flex flex-col justify-between h-full px-[40px]">
      <Header header={ header } />
      { children }
      {/*<Footer />*/}
    </div>
  )
}