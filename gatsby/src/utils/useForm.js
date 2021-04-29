import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValues(e) {
    // if number, convert
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy existing values into items
      ...values,
      // update new values that changed
      [e.target.name]: value,
    });
  }

  return { values, updateValues };
}
