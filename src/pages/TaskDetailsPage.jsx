import { useEffect, useState } from "react";
import { useParams } from "react-router";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);

      console.log(data);
    };

    fetchTasks();
  }, [taskId]);

  return (
    <div>
      <h1>task details</h1>
      <p>{task?.title}</p>
      <p>{task?.description}</p>
    </div>
  );
};

export default TaskDetailsPage;
