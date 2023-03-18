import { useContext } from 'react';
import { SettingsContext } from '../providers/SettingProvider';

// ==============================|| HOOKS: useSettings ||============================== //

const useSettings = () => useContext(SettingsContext);

export default useSettings;
