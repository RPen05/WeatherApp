import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';

const useLanguage = () => {
    return useSelector((state: RootState) => state.language?.lang);
};

export default useLanguage;