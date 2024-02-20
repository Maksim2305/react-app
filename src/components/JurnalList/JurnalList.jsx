import './JurnalList.css';
import CardButton from '../CardButton/CardButton';
import JurnalItem from '../JurnalItem/JurnalItem';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

function JurnalList({ items, onClick }) {
  const { userId } = useContext(UserContext);
  if (items.length === 0) {
    return <p>Вы ещё не добавили воспоминания</p>;
  } else {
    const sortDate = (a, b)=> {
      if(new Date(a.date).getTime() > new Date(b.date).getTime()) {
        return -1;
      } else {
        return 1;
      }

    };
    return (
      <>
        {items
          .filter(el => el.userId == userId)
          .sort(sortDate)
          .map((el) => (
          <CardButton key={el.id} onClick={()=>onClick(el)}>
            <JurnalItem title={el.title} date={el.date} post={el.post}/>
          </CardButton>
        ))}
      </>
    );
  }
}

export default JurnalList;
