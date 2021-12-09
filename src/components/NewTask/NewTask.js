import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {
  const { isLoading, error, setRequest: fetchTasks } = useHttp();

  const transformData = (taskText, dataTransformed) => {
    const generatedId = dataTransformed.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = (taskText) => {
    const payLoad = { text: taskText };

    fetchTasks(
      {
        url: "https://react-test-59bf9-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: payLoad,
      },
      transformData.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
