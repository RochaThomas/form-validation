import React, {useReducer} from "react";

const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const initialState = {
        firstName: {
            value: '',
            error: null
        },
        lastName: {
            value: '',
            error: null
        },
        email: {
            value: '',
            error: null
        }
    };

function reducer(state, action) {
    let inputError = null;
    
    switch (action.type) {
        case "firstName":
            console.log(action.payload);
            if (action.payload === ""){
                inputError = "First name cannot be left blank";
            }
            break;
        case "lastName":
            if (action.payload === ""){
                inputError = "Last name cannot be left blank";
            }
            break;
        case "email":
            if (action.payload === ""){
                inputError = "Email cannot be left blank";
            }
            else if (emailFormat.test(action.payload) === false){
                inputError = "Invalid email address";
            }
            break;
        default:
            break;
    }
    return {
        ...state,
        [action.type]: {
            value: action.payload,
            error: inputError
        }
    };
}

const FormInput = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    function handleChange(e) {
        console.log(e);
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        
        dispatch({
            type: name,
            payload: value
        });
    }

    return (
        <div>
            {JSON.stringify(state)}
            <div className="inputDiv">
                <label htmlFor="firstName">First Name: </label>
                <input type="text" name="firstName" id="firstName" onChange={ handleChange } value={ state.firstName.value }/>
            </div>
            {state.firstName.error !== null && (
                <p className="error" style={{color:'red'}}>{state.firstName.error}</p>
            )}
            <div className="inputDiv">
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" name="lastName" id="lastName" onChange={ handleChange } value={ state.lastName.value }/>
            </div>
            {state.lastName.error !== null && (
                <p className="error" style={{color:'red'}}>{state.lastName.error}</p>
            )}
            <div className="inputDiv">
                <label htmlFor="email">Email Address: </label>
                <input type="text" name="email" id="email" onChange={ handleChange } value={ state.email.value }/>
            </div>
            {state.email.error !== null && (
                <p className="error" style={{color:'red'}}>{state.email.error}</p>
            )}
        </div>
    );
}
export default FormInput;