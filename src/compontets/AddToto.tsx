import { useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";

import useSound from "use-sound";
import { sounds } from "../settings/sounds";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/lists/slice";

import type { Todo } from "../settings/types";

export const AddTodo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [playAddTodo] = useSound(sounds.addTodo);

  const addTodoHandler = (): void => {
    const todoItem = {
      todoText: inputValue,
      completed: false,
    } as Todo;
    dispatch(addTodo(todoItem));
    playAddTodo();
    setInputValue("");
  };

  return (
    <div className="todo__input-box">
      <input
        value={inputValue}
        className="todo__input"
        placeholder="Add todo..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        disabled={!inputValue}
        className="todo__button-add"
        title={"Add to list"}
        onClick={addTodoHandler}
      >
        <MdAssignmentAdd
          style={{ width: "30px", height: "30px" }}
          className="button__add-todo"
        />
      </button>
    </div>
  );
};
