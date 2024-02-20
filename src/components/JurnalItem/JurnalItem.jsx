import './JurnalItem.css';
function JurnalItem({ title, date, post}){
	const data = new Date(date);
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(data);
	return (
		<>
			<h2 className="jornal-item__header">{title}</h2>
			<h2 className="jornal-item__body">
				<div className="jornal-item__date">{formatedDate}</div>
				<div className="jornal-item__text">{post}</div>
			</h2>
		</>
	);
}
export default JurnalItem; 