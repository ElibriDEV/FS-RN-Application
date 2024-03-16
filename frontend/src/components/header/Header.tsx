import { FunctionComponent } from 'react';

export interface IHeaderProps {
  header: string
}

export const Header: FunctionComponent<IHeaderProps> = ({ header }: IHeaderProps) => {
    return(
      <div className="flex flex-row w-full py-[40px]">
        <h1 className="text-4xl font-museoSans font-bold text-primary text-left w-full">
          { header }
        </h1>
      </div>

    )
}