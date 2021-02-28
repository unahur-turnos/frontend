import { InputAdornment, TextField } from '@material-ui/core';
import { PropTypes } from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';

export function Buscador(props) {
  const { onChange, label } = props;

  return (
    <TextField
      fullWidth
      type="search"
      label={label}
      variant="outlined"
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

Buscador.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};
