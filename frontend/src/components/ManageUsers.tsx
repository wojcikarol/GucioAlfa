import React, { useState, useEffect } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Tooltip } from "@mui/material";
import serverConfig from "../server-config"; 

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    fetch(`${serverConfig.serverUrl}user/all`, { 
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  const toggleUserStatus = (currentStatus: boolean, userName: string) => {
    const token = localStorage.getItem("token");
  
    fetch(`${serverConfig.serverUrl}user/status/${userName}`, {
      method: "PATCH", // Using PUT method
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active: !currentStatus }),
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.name === userName ? { ...user, active: !currentStatus } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error toggling user status:", error);
      });
  };

const deleteUser = (userId: string) => {
    const token = localStorage.getItem("token");

    fetch(`${serverConfig.serverUrl}user/${userId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to delete user");
        }
        fetchUsers();
    })
    .catch((error) => {
        console.error("Error deleting user:", error);
    });
};
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography> 
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.active ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="red">Inactive</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title={user.active ? "Deactivate User" : "Activate User"}>
                    <Button
                      variant="contained"
                      color={user.active ? "error" : "success"}
                      onClick={() => toggleUserStatus(user.active, user.name)}
                    >
                      {user.active ? "Deactivate" : "Activate"}
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteUser(user._id)}
                      sx={{ ml: 2 }}
                    >
                      Delete
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default ManageUsers;
