import { Header, IHeaderProps } from '../../header/Header';
import { PropsWithChildren, useState } from 'react';
import { Button } from '@material-tailwind/react';
import { CreateTaskModal } from '../../tasks/CreateTaskModal';

export interface IInnerLayout extends PropsWithChildren, IHeaderProps {}

export const InnerLayout = ({ children, header }: IInnerLayout) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col h-full px-[40px]">
      <div className="flex flex-row items-center">
        <Header header={ header } />
        { header === "Главная" ? (
          <Button placeholder="" className="bg-primary text-2xl" onClick={() => setShowModal(true)}>+</Button>
        ) : null }
      </div>
      {showModal ? (
        <CreateTaskModal setShowModal={setShowModal} />
      ) : null}

      { children }
    </div>
  )
}