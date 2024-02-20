import CardButton from '../CardButton/CardButton';
import './AddButton.css';

function AddButton({ children, onClick }) {
  return <CardButton onClick={onClick} className="add-button">
    {children}
  </CardButton>;
}
export default AddButton;
