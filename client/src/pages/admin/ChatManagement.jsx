import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { Avatar, AvatarGroup, Skeleton, Stack } from "@mui/material";
import { tranformImage } from "../../lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import { useErrors } from "../../hooks/hook";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders";

const columns = [
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 110,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },

  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      return <AvatarCard max={100} avatar={params.row.members} />;
    },
  },

  {
    field: "totalMessages",
    headerName: "Messages",
    headerClassName: "table-header",
    width: 90,
  },

  {
    field: "createdBy",
    headerName: "Creator",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 70,
  },
];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/chats`,
    "dashboard-chats"
  );

  useErrors([
    {
      isError: error,
      error,
    },
  ]);

  useEffect(() => {
    if (data) {
      setRows(
        data?.data?.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: tranformImage(chat.avatar, 50),
          members: chat.members.map((member) =>
            tranformImage(member.avatar, 50)
          ),
          creator: {
            name: chat.creator.name,
            avatar: tranformImage(chat.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading && !chats ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Chats"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
