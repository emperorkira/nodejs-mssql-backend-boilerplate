import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate(); // Corrected typo
  const [data, setData] = useState({ name:'', email:'', password:'' });

  const handleRegister = async (e:any) => {
    e.preventDefault(); // Corrected typo
    try {
      const {name , email, password} = data
      const response:any = await axios.post('/pass', { name, email, password });
      const responseData = response.data;
      console.log(responseData)
      if (responseData.category === 'error') {
        toast.error(responseData.message);
      } else {
        setData({ name: "", email: '', password: '' });
        toast.success(responseData.message);
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // You can also show an error toast to the user here
    }
  };
  
  return (
    <div>
      <form onSubmit={handleRegister}>
        <div>
          <label>Full Name:</label>
          <input type='text' placeholder="Full name..." name='name' value={data.name} onChange={(e)=> setData({...data, name: e.target.value})} required />
        </div>
        <div>
          <label>Email:</label>
          <input type='email' placeholder="Email..." name='email' value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} required />
        </div>
        <div>
          <label>Password:</label>
          <input type='password' placeholder="Password..." name='password' value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} required />
        </div>
        <div>
          <button type='submit'>Register</button>
        </div>
      </form>
    </div>
  );
};
