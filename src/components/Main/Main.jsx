import JurnalForm from '../JurnalForm/JurnalForm';
import './Main.css'; 

function Main({children}){
	return (
		<div className="main-container">
			{children}
		</div>
	);
}
export default Main;