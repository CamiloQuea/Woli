import React from "react";

interface MainContentLayoutProps {
  centerNodes?: React.ReactNode;
  leftNodes?: React.ReactNode;
  rightNodes?: React.ReactNode;
}

export const MainContentLayout = ({
  centerNodes,
  leftNodes,
  rightNodes,
}: MainContentLayoutProps) => {
  return (
    <div className="flex h-full grow  flex-col  items-center  justify-center  gap-4 px-5 lg:flex-row   lg:items-stretch">
      <div className="flex w-full  flex-col mdlg:w-[700px]  lg:w-[300px] ">
        {leftNodes}
      </div>
      <div className="flex w-full  flex-1 flex-col  p-3 mdlg:w-[700px]   lg:flex-none">
        {centerNodes}
      </div>
      <div className=" hidden  flex-col  lg:w-[300px] xl:flex  ">
        {rightNodes}
      </div>
    </div>
  );
};
