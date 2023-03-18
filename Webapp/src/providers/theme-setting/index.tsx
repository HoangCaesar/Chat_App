import PropTypes from 'prop-types';

// Project Import
import SettingsDrawer from './drawer';
import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';
import ThemeColorPresets from './ThemeColorPresets';
import ThemeLocalization from './ThemeLocalization';

// ==============================|| THEME-SETTING ||============================== //

const ThemeSettings = ({ children }: any) => {
    return (
        <ThemeColorPresets>
            <ThemeContrast>
                <ThemeLocalization>
                    <ThemeRtlLayout>
                        {children}
                        <SettingsDrawer />
                    </ThemeRtlLayout>
                </ThemeLocalization>
            </ThemeContrast>
        </ThemeColorPresets>
    );
};

ThemeSettings.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeSettings;
