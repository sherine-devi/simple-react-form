import React, { useState } from "react";

function Form() {
  const [values, setValues] = useState({
    name: "", age: "", email: "", note: ""
  });

  const set = (name) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [name]: value }));
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      alert("OK!");
    } catch (e) {
      alert(`Failed! ${e.message}`);
    }
  }
 
  return (
    <form onSubmit={onSubmit}> 
      <label>Name*:</label>
      <input 
        type="text" required
        value={values.name} onChange={set("name")}
      />

      <label>Age:</label>
      <input
        type="number"  min="1"
        value={values.age} onChange={set("age")} 
      />

      <label>Email*:</label>
      <input 
        type="email" required
        value={values.email} onChange={set("email")}
      />

      <label>Note:</label>
      <textarea value={values.note} onChange={set("note")} />

      <button type="submit">Submit</button>
    </form>
  );
}
  
  export default Form;