import React from "react";
import {  Grid , Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewIcon from '@mui/icons-material/Autorenew';
type Status = {
  name: string;
  count: number;
};
interface StatusBarProps {
  statuses: Status[];
}
const statusStyles: Record<
  string,
  { backgroundColor: string; icon: JSX.Element }
> = {
  "On going": {
    backgroundColor: "#6992EB",
    icon: <AutorenewIcon />,
  },
  "In Progress": {
    backgroundColor: "#F7C55C",
    icon: <AccessTimeIcon />,
  },
  Done: {
    backgroundColor: "#71C1C2",
    icon: <CheckCircleIcon />,
  },
  Cancelled: {
    backgroundColor: "#E77866",
    icon: <BlockIcon />,
  },
};

const StatusBar: React.FC<StatusBarProps> = ({ statuses }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {statuses.map((status, index) => {
        const { backgroundColor, icon } =
          statusStyles[status.name] || statusStyles["To Do"];

        return (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Box
              sx={{
                backgroundColor: backgroundColor,
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                color: "#fff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
                boxSizing: "border-box",
                flexWrap: "wrap",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30%",
                  mb: { xs: 1, sm: 0 },
                }}
              >
                {icon}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "70%",
                  textAlign: "left",
                }}
              >
                <Typography variant="subtitle1">{status.name}</Typography>
                <Typography variant="subtitle1">
                  {status.count} tasks
                </Typography>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatusBar;
