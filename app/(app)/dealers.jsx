import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function Dealers(){
    const { signOut } = useAuth();
    const { isDarkMode } = useTheme();
    
    const themeColors = {
    background: isDarkMode ? '#1b1b1b' : '#f2f2f2',
    surface: isDarkMode ? '#1E1E1E' : '#f2f2f2',
    inputBg: isDarkMode ? '#2C2C2C' : '#F4F5F7',
    border: isDarkMode ? '#333333' : '#E5E5E5',
    textMain: isDarkMode ? '#f2f2f2' : '#1b1b1b',
    textSub: isDarkMode ? '#AAAAAA' : '#666666',
    };

    
}