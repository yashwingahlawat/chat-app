import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, tranformImage } from "../../lib/features";
import { Avatar, Stack, Box, Skeleton } from "@mui/material";

import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";
const columns = [
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);

            return (
              <Box>
                <a
                  href={url}
                  download
                  target="_blank"
                  style={{
                    color: "black",
                  }}
                >
                  {RenderAttachment(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },

  {
    field: "sentBy",
    headerName: "Sent By",
    headerClassName: "table-header",
    width: 200,

    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },

  {
    field: "groupChat",
    headerName: "Group",
    headerClassName: "table-header",
    width: 70,
  },

  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 200,
  },
];

const MessagesManagement = () => {
  const [rows, setRows] = useState([]);
  const { loading, data, error } = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
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
      data?.messages?.map((msg) => ({
        ...msg,

        id: msg._id,
        sender: {
          name: msg.sender.name,
          avatar: tranformImage(msg.sender.avatar, 50),
        },
        createdAt: moment(msg.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Messages"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default MessagesManagement;
