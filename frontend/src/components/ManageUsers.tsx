import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Tooltip,
} from "@mui/material";
import serverConfig from "../server-config";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  isAdmin: boolean;
  lastUpdated?: string; 
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${serverConfig.serverUrl}user/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (currentStatus: boolean, userId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${serverConfig.serverUrl}user/status/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ active: !currentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      fetchUsers(); 
    } catch (error) {
      console.error("Error toggling user status:", error);
      setError("Failed to toggle user status. Please try again later.");
    }
  };

  const deleteUser = async (userId: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${serverConfig.serverUrl}user/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again later.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "admin" : "user"}</TableCell>
                <TableCell>
                  {user.lastUpdated
                    ? new Date(user.lastUpdated).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {user.active ? (
                    <Typography color="green">Active</Typography>
                  ) : (
                    <Typography color="red">Inactive</Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={user.active ? "Deactivate User" : "Activate User"}
                  >
                    <Button
                      variant="contained"
                      color={user.active ? "error" : "success"}
                      onClick={() => toggleUserStatus(user.active, user._id)}
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
