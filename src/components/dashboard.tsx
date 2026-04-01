import React, { useCallback } from 'react';
import {useState, useEffect} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Collapse } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const User= {
  name: '',
  email: '',
  role: '',
  status: '',
  login: '',
  activity: '',
  group: ''
}

interface User {
  name: string;
  email: string;
  role: string;
  status: string;
  login: string;
  activity: string;
  group: string;
}


function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    login: '',
    activity: '',
    group: ''
  });
  // const [error, setError] = useState<{
  //   name: false,
  //   email: false,
  //   role: false,
  //   status: false,
  //   login: false,
  //   activity: false,
  //   group: false
  // }>({
  //   name: false,
  //   email: false,
  //   role: false,
  //   status: false,
  //   login: false,
  //   activity: false,
  //   group: false
  // });

  const [error, setError] = useState('');
  const [openItem, setOpenItem] = useState(null); 

  // const toggleItem = (id) => {
  //   setOpenItem(openItem === id ? null : id);
  // };

  const validateForm = () => {
    if (!formData.name.trim()) {
      // setError((prev) => {prev.name, true});
      setError('Name is required');
      return false;
    }
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!formData.role) {
      setError('Role is required');
      return false;
    }
    if (!formData.status) {
      setError('Status is required');
      return false;
    }
    if (!formData.login) {
      setError('Login is required');
      return false;
    }
    if (!formData.activity) {
      setError('Activity is required');
      return false;
    }
    if (!formData.group) {
      setError('Group is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = useCallback((e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // setUsers((prev) => [formData, ...prev]);
  }, []);

  const handleSubmit = useCallback((e: any) => {
    debugger;
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      login: formData.login,
      activity: formData.activity,
      group: formData.group
    };

    setUsers((prev) => [payload, ...prev]);
    console.log('Form Submitted with data:', formData);
    setFormData({
        name: '',
        email: '',
        role: '',
        status: '',
        login: '',
        activity: '',
        group: ''
      })
  }, [users]);


  return (
    <div className="container mt-5">
      <Form onSubmit={(event) => handleSubmit(event)} noValidate>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName" className="mb-3">
          {/* <Form.Label>Name</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="Username"
            name="name"
            value={formData.name}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRole" className="mb-3">
          {/* <Form.Label>Role</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="User Role"
            name="role"
            value={formData.role}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicStatus" className="mb-3">
          {/* <Form.Label>Status</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="User Status"
            name="status"
            value={formData.status}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLogin" className="mb-3">
          {/* <Form.Label>Login</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="User Login"
            name="login"
            value={formData.login}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicActivity" className="mb-3">
          {/* <Form.Label>Activity</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="User Activity"
            name="activity"
            value={formData.activity}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicGroup" className="mb-3">
          {/* <Form.Label>Group</Form.Label> */}
          <Form.Control
            type="text"
            placeholder="User Group"
            name="group"
            value={formData.group}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <div className="accordion">
        {/* {users.map((user) => (
          user.name
        ))} */}
      </div>

    </div>
  );
}


export default Dashboard;
