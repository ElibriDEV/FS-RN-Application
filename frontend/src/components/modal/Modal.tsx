import { PropsWithChildren } from 'react';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface IModalProps extends PropsWithChildren {
  title: string;
  setShowModal: (arg: boolean) => void;
  width: number;
}

export const ModalWindowLayout = (props: IModalProps) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className={`w-[${props.width}px]`}>
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-row justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">
                { props.title }
              </h3>
              <div className="w-[30px] h-[30px] border-1 border-primary rounded-[10px] cursor-pointer" onClick={() => props.setShowModal(false)}>
                <XMarkIcon />
              </div>
            </div>
            <div className="p-5">
              {props.children}
            </div>

          </div>

        </div>

      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}