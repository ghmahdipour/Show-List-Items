import Landing from "../../containers/landing";

const PublicLayout: React.FC<{}> = (props: any) => {

  return (
    <div className="flex bg-indigo-100 flex-col h-screen w-screen">
      <div className="flex h-full items-center justify-center gap-14" >
        <Landing />
      </div>
    </div>
  );
};

export default PublicLayout;
