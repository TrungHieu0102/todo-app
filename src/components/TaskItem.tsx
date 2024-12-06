import React from "react";
import { ListItem, Button, ButtonGroup, Box, Typography } from "@mui/material";

interface TaskItemProps {
  task: { id: number; name: string; status: string };
  onStatusChange: (newStatus: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const statuses = ["On going", "In Progress", "Done", "Cancelled"];

  return (
    <ListItem
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "8px 16px",
        marginBottom: "8px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        width: "100%",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          marginRight: { sm: 2 },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "4px" }}
        >
          {task.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Current Status: {task.status}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          mt: { xs: 1, sm: 0 },
        }}
      >
        <ButtonGroup
          variant="outlined"
          size="small"
          sx={{
            width: { xs: "100%", sm: "auto" },
            flexWrap: "wrap",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {statuses.map((status) => (
            <Button
              key={status}
              onClick={() => onStatusChange(status)}
              variant={task.status === status ? "contained" : "outlined"}
              sx={{
                width: { xs: "100%", sm: "auto" },
                marginBottom: { xs: "8px", sm: 0 },
                textTransform: "none",
                borderRadius: "4px",
                color: task.status === status ? "#fff" : "inherit",
                backgroundColor:
                  task.status === status ? "#71C1C2" : "transparent",
                "&:hover": {
                  backgroundColor:
                    task.status === status ? "#F7C55C" : "#e0e0e0",
                  boxShadow:
                    task.status !== status
                      ? "0 2px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                },
              }}
            >
              {status}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </ListItem>
  );
};

export default TaskItem;
