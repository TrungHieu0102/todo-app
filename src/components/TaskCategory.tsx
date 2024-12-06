import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  CircularProgress,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TaskItem from "./TaskItem";

interface TaskCategoryProps {
  category: string;
  totalTasks: number;
  completionPercentage: number;
  tasks: { id: number; name: string; status: string }[];
  onStatusChange: (taskId: number, newStatus: string) => void;
}

const TaskCategory: React.FC<TaskCategoryProps> = ({
  category,
  totalTasks,
  completionPercentage,
  tasks,
  onStatusChange,
}) => {
  return (
    <Accordion sx={{ 
      marginTop: "15px",
      borderRadius: "8px", 
      marginBottom: "10px",
      border: "1px solid #000", 
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      "&:before": {
        display: "none",
      },
    }}>
      <AccordionSummary 
        expandIcon={<ExpandMoreIcon />} 
        sx={{
          borderRadius: "8px",
          borderBottom: "4px solid #000", 
          backgroundColor: "#f9f9f9",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {category}
            </Typography>
            <Typography variant="body2">
              Total Tasks: {totalTasks}
            </Typography>
          </Box>

          <Box sx={{ position: "relative" }}>
            <CircularProgress
              variant="determinate"
              value={completionPercentage}
              size={60}
              thickness={4}
              sx={{
                color: completionPercentage === 100 ? "#4CAF50" : "#71C1C2",
                borderRadius: "50%",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {completionPercentage}%
            </Box>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskCategory;
