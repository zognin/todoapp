import React, { useState } from 'react';
import axios from 'axios';
import { productionBackendURL } from '../Path';

interface TodoAttributes {
  task: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  is_completed: boolean;
  is_priority: boolean;
  slug: string;
  user_id: number;
  id: number;
}

interface Todo {
  attributes: TodoAttributes;
  id: string;
  [key: string]: string | object;
}

interface Props {
  id: string;
  isCompleted: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  waitTime: number;
  setWaitTime: React.Dispatch<React.SetStateAction<number>>;
  items: undefined | Todo[];
}

const CheckboxTicked: React.FC<Props> = ({
  id,
  isCompleted,
  setError,
  waitTime,
  setWaitTime,
  items,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [isMarkedCompleted, setIsMarkedCompleted] = useState(isCompleted);

  let headerData = JSON.parse(sessionStorage.userData);

  const toggleCheckbox = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const id = (e.target as HTMLElement).getAttribute('id');
    const toggle_completed = !isMarkedCompleted;
    setIsMarkedCompleted(!isMarkedCompleted);
    let changedItem = { id: id, is_completed: toggle_completed };
    const findItemById = items!.find((item) => item.id === id);
    findItemById!.attributes.is_completed = toggle_completed;
    setWaitTime(waitTime + 3000);
    setTimeout(() => {
      axios
        .put(
          `${productionBackendURL}/api/v1/todos/${id}`,
          { todo: changedItem },
          {
            headers: headerData,
          }
        )
        .then(() => setWaitTime(waitTime - 3000))
        .catch(() => setError(true));
    }, waitTime);
  };

  return (
    <div
      onClick={toggleCheckbox}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isMarkedCompleted ? (
        isHover ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='81'
            height='81'
            viewBox='0 0 81 81'
            id={id}
          >
            <g id={id} data-name='Group 17' transform='translate(-1211 -576)'>
              <g
                id={id}
                data-name='Rectangle 9'
                transform='translate(1211 576)'
                fill='#ceedff'
                stroke='#0c129f'
                strokeWidth='12'
              >
                <rect width='81' height='81' stroke='none' id={id} />
                <rect x='6' y='6' width='69' height='69' fill='none' id={id} />
              </g>
              <line
                id={id}
                data-name='Line 1'
                x2='14'
                y2='17'
                transform='translate(1233.5 615.5)'
                fill='none'
                stroke='#0c129f'
                strokeWidth='8'
              />
              <line
                id={id}
                data-name='Line 2'
                x1='31'
                y2='30'
                transform='translate(1243.5 602.5)'
                fill='none'
                stroke='#0c129f'
                strokeWidth='8'
              />
            </g>
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='81'
            height='81'
            viewBox='0 0 81 81'
            id={id}
          >
            <g id={id} data-name='Group 3' transform='translate(-1207 -399)'>
              <g id={id} data-name='Group 5' transform='translate(-4 -177)'>
                <g
                  id={id}
                  data-name='Rectangle 9'
                  transform='translate(1211 576)'
                  fill='#fff'
                  stroke='#0c129f'
                  strokeWidth='12'
                >
                  <rect width='81' height='81' stroke='none' id={id} />
                  <rect
                    x='6'
                    y='6'
                    width='69'
                    height='69'
                    fill='none'
                    id={id}
                  />
                </g>
                <line
                  id={id}
                  data-name='Line 1'
                  x2='14'
                  y2='17'
                  transform='translate(1233.5 615.5)'
                  fill='none'
                  stroke='#0c129f'
                  strokeWidth='8'
                />
                <line
                  id={id}
                  data-name='Line 2'
                  x1='31'
                  y2='30'
                  transform='translate(1243.5 602.5)'
                  fill='none'
                  stroke='#0c129f'
                  strokeWidth='8'
                />
              </g>
            </g>
          </svg>
        )
      ) : (
        <div
          className='todolist-checkbox'
          onClick={toggleCheckbox}
          id={id}
        ></div>
      )}
    </div>
  );
};

export default CheckboxTicked;
