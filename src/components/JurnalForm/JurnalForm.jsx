import styles from './JurnalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import formReducer, { INITIAN_STATE } from './JurnalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../context/userContext';

function JurnalForm({ onSubmit, data, onDelete }) {
  const [formValid, dispatchForm] = useReducer(formReducer, INITIAN_STATE);
  const { isValid, values, isFormReatyToSubmit } = formValid;
  const {userId} = useContext(UserContext);

  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();

  const errorFocus = (state) =>{
    switch(true){
      case !state.title :
        titleRef.current.focus();
      break;
      case !state.date :
        dateRef.current.focus();
      break;
      case !state.post :
        postRef.current.focus();
      break;
    }
  };

  useEffect(()=>{
    if(data){
      dispatchForm({ type: 'SET_VALUE', payload: { ...data } });
    } else {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  },[data]);
  
  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.date || !isValid.post) {
      errorFocus(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: 'RESET_FORM' });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReatyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReatyToSubmit, values, onSubmit, userId]);

  useEffect(()=>{
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  },[userId]);

  const onChange = (e) => {
    dispatchForm({
      type: 'SET_VALUE',
      payload: { [e.target.name]: e.target.value }
    });
  };

  const addJurnalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const delElem = (e) => {
    e.preventDefault();
    onDelete(data);
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  };

  return (
    <form className={styles['jurnal-form']} onSubmit={addJurnalItem}>
      <div className={styles['title-wrap']}>
        <Input
          type="text"
          name="title"
          onChange={onChange}
          value={values.title}
          ref={titleRef}
          isValid={isValid.title}
          appearence="title"
        />
        {data?.id && <Button className={'delete-button'} onClick={delElem}>
            <img src="/delete.svg" alt="del" />
        </Button>}
      </div>
      <div className={cn(styles['input-wrap'], styles['border'])}>
        <label htmlFor="date" className={styles['label-input']}>
          <img src="/calendar.svg" alt="Calendar" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          ref={dateRef}
          onChange={onChange}
          isValid={isValid.date}
          value={values.date}
          id="date"
        />
      </div>
      <div className={cn(styles['input-wrap'], styles['border'])}>
        <label htmlFor="tag" className={styles['label-input']}>
          <img src="/folder.svg" alt="Folder" />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          name="tag"
          id="tag"
          onChange={onChange}
          value={values.tag}
          isValid={isValid.tag}
          className={cn(styles['input'])}
        />
      </div>
      <textarea
        name="post"
        cols="30"
        rows="10"
        ref={postRef}
        onChange={onChange}
        value={values.post}
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
      ></textarea>
      <Button className={'button accent'}>
        Сохранить
      </Button>
    </form>
  );
}

export default JurnalForm;
