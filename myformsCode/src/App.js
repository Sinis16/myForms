import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ email: true, password: true });

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordValid = validatePassword(newPassword);
    setFormValues({ ...formValues, password: newPassword });
    setValidationStates({ ...validationStates, password: passwordValid });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const hasNumbers = /\d/;
    const hasLetters = /[a-zA-Z]/;
    return password.length >= 9 && hasNumbers.test(password) && hasLetters.test(password);
  };

  const clickSubmit = () => {
    const emailValid = validateEmail(formValues.email);
    setValidationStates({ email: emailValid, password: validationStates.password});

    if (emailValid && validationStates.password) {
      alert('Formulario válido: ' + JSON.stringify(formValues));
      // Lógica para manejar un formulario válido, como una petición fetch
    } else {
      alert('Formulario inválido. Revisa los campos.');
    }
  };

  return (
    <div className="App">
      <h1>Ejemplo de formularios</h1>

      <Form>
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} />
          {!validationStates.email && <Form.Text className="text-muted">Por favor ingresa un correo electrónico válido.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
          {!validationStates.password && <Form.Text className="text-muted">La contraseña debe tener al menos 9 caracteres e incluir números y letras.</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;