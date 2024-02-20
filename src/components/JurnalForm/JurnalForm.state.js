export const INITIAN_STATE = {
    isValid : {
        title: true,
        post: true,
        tag: true,
        date: true
    },
    values: {
        title: '',
        post: '',
        tag: '',
        date: ''
    },
    isFormReatyToSubmit: false
};

export default function formReducer(state, action) {
    switch (action.type) {
        case 'RESET_FORM':
            return {...state, isValid: INITIAN_STATE.isValid};
        case 'CLEAR':
            return {...state, values: INITIAN_STATE.values, isFormReatyToSubmit: false};
        case 'SET_VALUE':
            return {...state, values : {...state.values, ...action.payload}};
        case 'SUBMIT': {
            const validTitle = Boolean(state.values.title?.trim().length);
            const validPost = Boolean(state.values.post?.trim().length);
            const validDate = Boolean(state.values.date);
            return {
                ...state,
                isValid:{
                    title: validTitle,
                    post: validPost,
                    date: validDate,
                    tag: true
                },
                isFormReatyToSubmit: validTitle && validPost && validDate
            };
        }
        
        
    }
}