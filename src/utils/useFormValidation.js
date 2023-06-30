import { useCallback, useState } from "react";


export default function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});


  function handleChange(evt) {
    const nameInput = evt.target.name;
    const valueInput = evt.target.value;
    const validationMessageInput = evt.target.validationMessage;
    const validInput = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((value) => {
      return { ...value, [nameInput]: valueInput}
    })

    setErrors((error) => {
      return { ...error, [nameInput]: validationMessageInput}
    })

    setIsValid(form.checkValidity())

    setIsInputValid((isInputValid) => {
      return { ...isInputValid, [nameInput]: validInput}
    })
  }

  function resetAllState(data={}) {
    setValues(data);
    setErrors({});
    setIsValid(false);
    setIsInputValid({});
  }

  const setValue = useCallback((name, val) => {
    setValues((value) => {
      return { ...value, [name]: val}
    })
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, resetAllState, setValue}
}