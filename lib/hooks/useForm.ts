import { useState } from 'react';

export const useForm = (defaults) => {
  const [values, setValues] = useState(defaults);

  const updateValueManually = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const removeValues = () => {
    setValues(defaults)
  }

  function updateValue(e) {
    // check if its a number and convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update the new value that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValue, updateValueManually, removeValues };
}