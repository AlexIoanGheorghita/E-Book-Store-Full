import './App.css';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

/* General theme for frequently used colors and fonts */
const theme = {
  colors: {
    bgVeryLightGrey: '#F2F2F2',
    bgLightTan: '#FAF4ED',
    bgLightTan2: '#F3ECE5',
    bgLightPink: '#F9DDD9',
    textVeryDarkGrey: '#404040',
    textDarkGrey: '#666666',
    textLightGrey: '#CCCCCC',
    textMediumGrey: '#A6A6A6',
    buttons: '#F7C574',
    underlines: '#F28482',
    darkBlue: '#002060'
  },
  font: {
    headings: '\'Cardo\', serif',
    paragraphs: '\'Josefin Sans\', sans-serif',
    paragraphs2: '\'Poppins\', sans-serif',
    headings2: '\'Zilla Slab\', \'Times New Roman\', serif'
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='*' element={<PublicLayout />} />  
          <Route path='/users/*' element={<ProtectedLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
