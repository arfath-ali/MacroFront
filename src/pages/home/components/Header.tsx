const Header = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-bold">MacroFront</h1>
        <button className="text-semibold cursor-pointer rounded-[5px] border px-2 pb-1 hover:border-gray-400 hover:bg-gray-100 dark:border-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-700">
          Sign In
        </button>
      </div>
      <div className="tablet:mt-16 mt-8 text-center">
        <h1 className="text-bold tablet:text-5xl text-2xl">
          {' '}
          Live Markets, Economic Insights and News
        </h1>
        <p className="text-medium tablet:mt-4 mt-2 text-gray-500">
          Track Trends, Stay Informed, And Visualize Data In Real Time
        </p>
      </div>
    </div>
  );
};

export default Header;
