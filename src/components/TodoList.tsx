import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import StatusBar from "./StatusBar";
import TaskCategory from "./TaskCategory";

const initialData = [
  {
    category: "Work",
    tasks: [
      { id: 1, name: "Finish project report", status: "On going" },
      { id: 2, name: "Email client", status: "Done" },
      { id: 3, name: "Schedule meeting", status: "In Progress" },
    ],
  },
  {
    category: "Personal",
    tasks: [
      { id: 4, name: "Buy groceries", status: "On going" },
      { id: 5, name: "Clean room", status: "Done" },
      { id: 6, name: "Read a book", status: "Done" },
    ],
  },
];

const calculateStatusCounts = (categories: typeof initialData) => {
  const statusCount: Record<string, number> = {
    "On going": 0,
    "In Progress": 0,
    "Done": 0,
    "Cancelled": 0,
  };

  categories.forEach((category) => {
    category.tasks.forEach((task) => {
      statusCount[task.status] += 1;
    });
  });

  return Object.keys(statusCount).map((status) => ({
    name: status,
    count: statusCount[status],
  }));
};

const calculateCategoryCompletion = (categories: typeof initialData) => {
  return categories.map((category) => {
    const totalTasks = category.tasks.length;
    const completedTasks = category.tasks.filter(
      (task) => task.status === "Done"
    ).length;

    const completionPercentage = totalTasks
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

    return {
      category: category.category,
      totalTasks,
      completionPercentage,
      tasks: category.tasks,
    };
  });
};

const TodoList: React.FC = () => {
  const [categories, setCategories] = useState(initialData);

  const statuses = calculateStatusCounts(categories);
  const categoryData = calculateCategoryCompletion(categories);

  const updateTaskStatus = (categoryName: string, taskId: number, newStatus: string) => {
    const updatedCategories = categories.map((category) => {
      if (category.category !== categoryName) return category;

      const updatedTasks = category.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      return { ...category, tasks: updatedTasks };
    });

    setCategories(updatedCategories);
  };

  return (
    <Container>
      <StatusBar statuses={statuses} />
      <Typography variant="h6">Recent task</Typography>
      {categoryData.map((cat, index) => (
        <TaskCategory
          key={index}
          category={cat.category}
          totalTasks={cat.totalTasks} 
          completionPercentage={cat.completionPercentage}
          tasks={cat.tasks}
          onStatusChange={(taskId, newStatus) =>
            updateTaskStatus(cat.category, taskId, newStatus)
          }
        />
      ))}
    </Container>
  );
};

export default TodoList;
