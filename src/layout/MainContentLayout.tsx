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
    <div className="flex h-full grow  flex-col  px-5  lg:flex-row  items-center lg:items-stretch justify-center   gap-4">
      <div className="flex w-full mdlg:w-1/2 flex-col  lg:w-[300px] ">{leftNodes}</div>
      <div className="flex flex-col  w-full mdlg:w-[700px]  flex-1 lg:flex-none   p-3">{centerNodes}</div>
      <div className=" hidden  flex-col  lg:w-[300px] xl:flex  ">{rightNodes}</div>
      {/* <div className="w-full justify-start px-2 py-3 lg:sticky lg:top-16 lg:w-1/4 grow border-r h-full shrink-0 flex-initial">
        
        {leftNodes}
      </div>

      <div className="flex   min-h-0 w-full shrink-0 flex-col gap-3 px-2 py-3 lg:w-[600px]">
        {centerNodes}

      </div>

      <div className=" sticky top-16  hidden  w-1/4  shrink-0 justify-start xl:block ">
        {rightNodes}
      </div> */}
    </div>
  );
};
