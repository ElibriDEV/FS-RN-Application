import { Tasks } from '../../components/tasks/Tasks';
import { InnerLayout } from '../../components/layout/inner-layout/InnerLayout';
import { RSidebar } from '../../components/r-sidebar/RSidebar';

export const Dashboard = () => {


  return (
    <div className="flex flex-row">
      <div className="w-full h-screen overflow-y-scroll">
        <InnerLayout header="Главная">
          <Tasks />
        </InnerLayout>
      </div>
      <RSidebar />
    </div>
  );
}