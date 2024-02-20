import './App.css';
import LeftPanel from './components/LeftPanel/LeftPanel';
import Main from './components/Main/Main';
import JurnalForm from './components/JurnalForm/JurnalForm';
import JurnalList from './components/JurnalList/JurnalList';
import AddButton from './components/AddButton/AddButton';
import { useLocalStorage } from './components/hooks/use-localstorage.hook';
import Header from './components/Header/Header';
import { UserContextProvider } from './components/context/userContext'; 
import { useState } from 'react';

const mapItems = (items) =>{
  if(!items){
    return [];
  } else{
     return items;
  }
};


function App() {
  const [items, setItems] = useLocalStorage('data');
  const [selectItem, setSelectItem] = useState(null);
  const addItem = (item) => {
    if(!mapItems(items).some(i => i.id === item.id)){
      setItems([
        ...mapItems(items),
        {
          ...item,
          id: mapItems(items).length > 0 ? Math.max(...mapItems(items).map((item) => item.id)) + 1 : 1
        }
      ]);
    } else {
      setItems([...mapItems(items)].map(i => {
        if(i.id == item.id){
          return item;
        } else {
          return i;
        }
      }));
    }
  };

  const deleteItem = (item) => {
    if(!item.id) return;
    setItems([...mapItems(items).filter(i => i.id!== item.id)]);
  };
  const clearForm  = () => {
    setSelectItem(null);
  };

  return (
    <UserContextProvider>
      <div className="app">
      <LeftPanel>
        <Header />
        <AddButton onClick={clearForm}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
          >
            <path
              d="M10 4.96265V16.6293"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16669 10.796H15.8334"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Новое воспоминание
        </AddButton>
        <JurnalList items={mapItems(items)} onClick={setSelectItem}/>
      </LeftPanel>
      <Main>
        <JurnalForm onSubmit={addItem}  data={selectItem} onDelete={deleteItem}/>
      </Main>
    </div>
    </UserContextProvider>
  );
}

export default App;
