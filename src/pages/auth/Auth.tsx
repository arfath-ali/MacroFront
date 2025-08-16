import AuthFeatures from './components/AuthFeatures';

const Auth = () => {
  return (
    <>
      <header className="p-4">
        <h1 className="text-bold text-center text-4xl">MacroFront</h1>
        <p className="tablet:block text-semibold hidden">
          Live markets.Economic insights.Real-time analytics.
        </p>
        <div className="tablet:block hidden">
          <AuthFeatures />
        </div>
      </header>
      <main className="p-4">
        <div className="tablet:hidden">
          <AuthFeatures />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Auth;
