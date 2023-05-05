import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

export const Settings: React.FC = () => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const isAuth: Boolean = false;

  return (
    <div className="todo-settings">
      {isAuth && (
        <p className="todo-settings__text">
          User Name: <span>Rikel</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>
      {isAuth && (
        <p className="todo-settings__text">
          User Email: <span>Rikel@rik.rik</span>
        </p>
      )}
      <div className="todo-settings__devider"></div>

      <div className="todo-settings__language-box">
        <label htmlFor="" className="todo-settings__label">
          Language:
        </label>
        <input type="radio" />
        <input type="radio" />
      </div>
      <div className="todo-settings__devider"></div>

      <div className="todo-settings__sounds-box">
        <label htmlFor="" className="todo-settings__label">
          Sounds:
        </label>
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown sx={{ opacity: 0.7 }} />
            <Slider
              aria-label="Volume"
              value={value}
              onChange={handleChange}
              sx={{ color: 'rgba(97, 218, 251, 1)' }}
            />
            <VolumeUp sx={{ opacity: 0.7 }} />
          </Stack>
        </Box>
      </div>
      <div className="todo-settings__devider"></div>

      {isAuth && <button className="todo__button-logout">Logout</button>}
    </div>
  );
};
