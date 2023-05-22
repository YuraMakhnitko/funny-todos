import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSound from "use-sound";
import { sounds } from "../settings/sounds";

import { OneTodo, AddTodo } from "../compontets/index";

import type { Todo } from "../settings/types";
import type { RootState } from "../redux/store";
import { comleteOneTodo } from "../redux/lists/slice";

export const Home: React.FC = (): JSX.Element => {
  const [unCompletedTodoPlay] = useSound(sounds.unComplete);
  const [completedTodoPlay] = useSound(sounds.comlete);

  const dispatch = useDispatch();

  const { todosList, todosListCompleted } = useSelector(
    (state: RootState) => state.listsTodos
  );

  console.log(todosList, "todosList");
  console.log(todosListCompleted, "todosListCompleted");

  const [transferTodo, setTransferTodo] = useState<Todo>();

  const onDragStartHandler = (
    event: React.DragEvent<HTMLDivElement>,
    data: Todo
  ) => {
    const dataString = JSON.stringify(data);
    event.dataTransfer.setData("text", dataString);

    setTransferTodo(data);
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text")) as Todo;
    data.completed = !data.completed;
    dispatch(comleteOneTodo(data));
    data.completed ? completedTodoPlay() : unCompletedTodoPlay();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  return (
    <>
      <AddTodo />

      <div
        className="todo__items-active"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? allowDrop : undefined}
      >
        {todosList.length > 0 && (
          <>
            <h4 className="todo__sub-title">
              {`Your have ${todosList.length} active TODO${
                todosList.length > 1 ? "s" : ""
              }!`}
            </h4>
            {todosList.map((todo: Todo, index: number) => {
              return (
                <OneTodo
                  {...todo}
                  key={index}
                  index={index}
                  onDragStart={onDragStartHandler}
                />
              );
            })}
          </>
        )}
        {todosList.length === 0 && (
          <h4 className="todo__sub-title">Your list of TODOs is empty!</h4>
        )}
      </div>
      <div
        className="todo__items-completed"
        onDrop={dropHandler}
        onDragOver={transferTodo?.completed ? undefined : allowDrop}
      >
        {todosListCompleted.length === 0 && todosList.length > 0 && (
          <h4 className="todo__sub-title">
            Drag TOTO here to mark it as Completed
          </h4>
        )}
        {todosListCompleted.length > 0 && (
          <>
            <h4 className="todo__sub-title">
              {`Completed ${todosListCompleted.length} TODO${
                todosListCompleted.length > 1 ? "s" : ""
              }`}
            </h4>

            {todosListCompleted
              .map((todo, index) => {
                return (
                  <OneTodo
                    {...todo}
                    key={index}
                    index={index}
                    onDragStart={onDragStartHandler}
                  />
                );
              })
              .reverse()}
          </>
        )}
      </div>
    </>
  );
};
