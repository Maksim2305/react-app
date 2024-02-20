import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import './Header.css';

function Header() {
const { userId, setUserId } = useContext(UserContext);
const onChange = (e)=>{
    setUserId(e.target.value);
};
  return (
    <>
      <img className="logo" src="/logo.svg" alt="Logo" />
        <select className='select' name="users" value={userId} onChange={onChange}>
            <option className='option' value="1">Max</option>
            <option className='option' value="2">Kate</option>
        </select>
    </>
  );
}
export default Header;
