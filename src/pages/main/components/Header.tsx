const Header = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-bold">MacroFront</h1>
        <button className="text-semibold cursor-pointer rounded-[5px] border px-2 pb-1">
          Sign In
        </button>
      </div>
      <div className="tablet:mt-16 mt-8 text-center">
        <h1 className="text-bold text-2xl tablet:text-5xl"> Live Markets, Economic Insights and News</h1>
        <p className="text-medium tablet:mt-4 mt-2 text-gray-900">
          Track Trends, Stay Informed, And Visualize Data In Real Time
        </p>
      </div>
    </div>
  );
};

export default Header;
