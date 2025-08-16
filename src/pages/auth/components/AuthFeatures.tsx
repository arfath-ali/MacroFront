//import GrowthChartLightIcon from 'assets/images/icons/growth-chart-light-icon.png';
import GrowthChartDarkIcon from '/src/assets/images/icons/growth-chart-dark-icon.png';
//import GlobalNewsLightIcon from 'assets/images/icons/global-light-icon.png';
import GlobalNewsDarkIcon from '/src/assets/images/icons/global-dark-icon.png';
//import AnalyticsLightIcon from 'assets/images/icons/analytics-light-icon.png';
import AnalyticsDarkIcon from '/src/assets/images/icons/analytics-dark-icon.png';
//import CryptoLightIcon from '/src/assets/images/icons/crypto-light-icon.png';
import CryptoDarkIcon from '/src/assets/images/icons/crypto-dark-icon.png';

const AuthFeatures = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="feature-item">
        <img src={GrowthChartDarkIcon} className="feature-icon" />
        <p>Live Markets</p>
      </div>
      <div className="feature">
        <img src={GlobalNewsDarkIcon} className="feature-icon" />
        <p>Global News</p>
      </div>
      <div className="feature-item">
        <img src={AnalyticsDarkIcon} className="feature-icon" />
        <p>Analytics</p>
      </div>
      <div className="feature-item">
        <img src={CryptoDarkIcon} className="feature-icon" />
        <p>Crypto</p>
      </div>
    </div>
  );
};

export default AuthFeatures;
