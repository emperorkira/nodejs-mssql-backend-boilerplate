import { useState } from "react"
import axios from "axios"

export const Login = () => {
    const [data, setData] = useState({ email:'', password:''})

    const handleLogin = async (e: any) => {
      e.preventDefault();
      try {
        const response = await axios.get('/');
        console.log('Response:', response.data);
        // Handle success
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
    };
    

    return (
      <div>
        <form onSubmit={handleLogin}>
          <div >
            <label> Email:</label>
            <input type='text' placeholder="Email..." name='email' value={data.email} onChange={(e)=> setData({...data, email: e.target.value})} />
          </div>
          <div >
            <label> Password:</label>
            <input type='password' placeholder="Password..." name='password' value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} />
          </div>
          <div>
            <button type='submit'> Login </button>
          </div>
        </form>
      </div>
    )
  }
  