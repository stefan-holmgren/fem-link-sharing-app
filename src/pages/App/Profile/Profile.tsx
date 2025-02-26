import { useMobileMockup } from "../AppLayout/hooks/useMobileMockup";

export const Profile = () => {
  useMobileMockup({ showSkeleton: false });
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};
