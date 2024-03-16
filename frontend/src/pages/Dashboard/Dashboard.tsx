import { Posts } from '../../components/post/Posts';
import { InnerLayout } from '../../components/layout/inner-layout/InnerLayout';
import { RSidebar } from '../../components/r-sidebar/RSidebar';

export const Dashboard = () => {
  return (
    <div className="flex flex-row h-full">
      <div className="w-full">
        <InnerLayout header="My Courses">
          <Posts />
        </InnerLayout>

      </div>
      <RSidebar />

    </div>
  );
}