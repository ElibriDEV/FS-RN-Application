import { PropsWithChildren } from 'react';
import { TaskProps } from './TaskItem';

const taskLayout = (props: PropsWithChildren<TaskProps>) => {
  return (
    <div className="post bg-primaryLight rounded-[15px] p-5">
      { props.children }
    </div>
  )
}