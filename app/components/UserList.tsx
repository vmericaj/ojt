interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
  }
  
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", isActive: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", isActive: false },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", isActive: true },
  ];
  
  const activeUsers = users.filter(user => user.isActive);
  
  const UserList = () => {
    return (
      <div>
        <h1>Active Users</h1>
        <ul>
          {activeUsers.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;
  