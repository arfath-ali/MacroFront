import useThemeContext from '@/context/ThemeContext';
import GrowthChartLightIcon from '@/assets/images/icons/growth-chart-light-icon.png';
import GrowthChartDarkIcon from '@/assets/images/icons/growth-chart-dark-icon.png';
import GlobalNewsLightIcon from '@/assets/images/icons/global-light-icon.png';
import GlobalNewsDarkIcon from '@/assets/images/icons/global-dark-icon.png';
import AnalyticsLightIcon from '@/assets/images/icons/analytics-light-icon.png';
import AnalyticsDarkIcon from '@/assets/images/icons/analytics-dark-icon.png';
import CryptoLightIcon from '@/assets/images/icons/crypto-light-icon.png';
import CryptoDarkIcon from '@/assets/images/icons/crypto-dark-icon.png';

const AuthFeatures = () => {
  const { theme } = useThemeContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      <article className="feature-item border-default">
        <img
          src={theme === 'dark' ? GrowthChartDarkIcon : GrowthChartLightIcon}
          className="feature-icon"
        />
        <p>Live Markets</p>
      </article>

      <article className="feature-item border-default">
        <img
          src={theme === 'dark' ? GlobalNewsDarkIcon : GlobalNewsLightIcon}
          className="feature-icon"
        />
        <p>Global News</p>
      </article>

      <article className="feature-item border-default">
        <img
          src={theme === 'dark' ? AnalyticsDarkIcon : AnalyticsLightIcon}
          className="feature-icon"
        />
        <p>Analytics</p>
      </article>

      <article className="feature-item border-default">
        <img
          src={theme === 'dark' ? CryptoDarkIcon : CryptoLightIcon}
          className="feature-icon"
        />
        <p>Crypto</p>
      </article>
    </div>
  );
};

export default AuthFeatures;
