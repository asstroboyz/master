// import React, { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';

import axios from 'axios';
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5128/users');
        setUsers(response.data);
    };
    const addUser = async () => {
        await axios.post('http://localhost:5128/users', { name, email });
        fetchUsers();
    };
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="border p-2 mr-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 mr-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={addUser} className="bg-blue-500 text-white px-4 py-2">
                    Add User
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="border px-4 py-2">{user.id}</td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default UserManagement;