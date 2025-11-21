function Users({ user }) {

  return (
    <div 
    style={{border:"1px solid green",
        padding:"10px",
        borderRadius:"10px",
        width:"400px",
        margin:"10px"

    }}
    >
      <h1>USER COMPONENT</h1>

      <h1>
        User name: <span style={{ color: "green" }}>{user.name}</span>
      </h1>

      <h2>
        User age: <span style={{ color: "green" }}>{user.age}</span>
      </h2>

      <h2>
        User email: <span style={{ color: "green" }}>{user.email}</span>
      </h2>
    </div>
  );
}

export default Users;
