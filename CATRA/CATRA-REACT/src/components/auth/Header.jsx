import PropTypes from 'prop-types';
import { BsJustify } from 'react-icons/bs';
import './style.css';

function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <BsJustify className='icon' onClick={OpenSidebar}/>
    </header>
  )
}

Header.propTypes = {
  OpenSidebar: PropTypes.func.isRequired,
};

export default Header