import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { Avatar, Skeleton } from "@mui/material";
import { tranformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
import { LayoutLoader } from "../../components/layout/Loaders";

const columns = [
  {
    field: "id",
    headerName: "User ID",
    headerClassName: "table-header",
    width: 210,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 80,

    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 150,
  },

  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 80,
  },

  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 80,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);

  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/users`,
    "dashboard-users"
  );
  useErrors([
    {
      isError: error,
      error,
    },
  ]);

  useEffect(() => {
    if (!data) return;
    setRows(
      data?.data?.map((user) => ({
        ...user,
        id: user._id,
        avatar: tranformImage(user.avatar, 50),
      }))
    );
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
