import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';

const useTemperatureUnit = () => {
    return useSelector((state: RootState) => state.temperature?.unit);
};

export default useTemperatureUnit;