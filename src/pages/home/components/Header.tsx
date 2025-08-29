import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="p-4">
      <div className="flex justify-between">
        <h1 className="text-bold">MacroFront</h1>
        <button
          onClick={() => navigate('/auth')}
          className="text-semibold border-default cursor-pointer rounded-[5px] px-2 pb-1 hover:bg-gray-100 dark:hover:bg-gray-700">
          Sign In
        </button>
      </div>
      <section className="tablet:mt-16 mt-8 text-center">
        <h2 className="text-bold tablet:text-5xl text-2xl">
          Live Markets, Economic Insights and News
        </h2>
        <p className="text-medium tablet:mt-4 mt-2 text-gray-500">
          Track Trends, Stay Informed, And Visualize Data In Real Time
        </p>
      </section>
    </header>
  );
};

export default Header;
