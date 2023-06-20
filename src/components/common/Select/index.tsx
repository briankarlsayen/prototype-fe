import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  ListSubheader,
  TextField,
  InputAdornment,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import classnames from 'classnames';
import MuiSelect, {
  SelectChangeEvent,
  SelectProps as MuiSelectProps,
  selectClasses,
} from '@mui/material/Select';
import { ExpandMore } from '@mui/icons-material';
import { Typography } from '../Typography';
import { Chip } from '../Chip';
import { useStyles } from './index.styles';
import CheckSvg from '../Icon/check';
import { Icon } from '../Icon';

export interface ItemProps {
  label: string;
  value: string | number;
}

export interface SelectProps extends MuiSelectProps {
  defaultSelected?: string[];
  label?: string;
  items: ItemProps[];
  multiSelect?: boolean;
  search?: boolean;
  helperText?: string;
  fixHeight?: string;
  handleChange: (values: string[]) => void;
}

interface PlaceholderProps {
  text: string | undefined;
}

const Placeholder = ({ text }: PlaceholderProps) => {
  return (
    <Typography variant='body-2/semibold' customVariant='colorGray'>
      {text ?? ''}
    </Typography>
  );
};

const Select = ({
  defaultSelected = [],
  label,
  items,
  multiSelect,
  search,
  helperText,
  fixHeight,
  handleChange,
  placeholder,
  disabled,
  ...rest
}: SelectProps) => {
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const styles = useStyles({
    isOpen,
    multiSelect: Boolean(multiSelect),
  });

  const menuStyles = classnames({
    [styles.menuContainerMultiSelect]: search,
    [styles.menuContainerSingleSelect]: !search,
  });

  const handleOpen = useCallback(() => {
    setSearchText('');
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleDelete = useCallback((deletedItem: ItemProps) => {
    setSelected((items) => {
      return items.filter((item) => item !== deletedItem.value);
    });
  }, []);

  const handleOnChange = (e: SelectChangeEvent<unknown>) => {
    if (multiSelect) {
      const values = [...(e.target.value as string[])];
      setSelected(values);
      handleChange(values);
    } else {
      const values = [e.target.value as string];
      setSelected(values);
      handleChange(values);
    }
  };

  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().includes(searchText.toLowerCase());

  const displayedOptions = useMemo(
    () => items.filter((option) => containsText(option.label, searchText)),
    [searchText, items]
  );

  return (
    <Box sx={{ width: '100%' }} data-cy='select-container'>
      {label && (
        <Box data-cy='select-label' className={styles.label}>
          {label}
        </Box>
      )}
      <MuiSelect
        {...rest}
        disabled={disabled}
        fullWidth
        displayEmpty
        value={selected}
        onOpen={handleOpen}
        onClose={handleClose}
        onChange={handleOnChange}
        sx={{
          [`& .${selectClasses.select}`]: {
            padding: multiSelect && selected.length > 0 ? '7px 8px' : '9px 8px',
          },
          height: fixHeight,
        }}
        autoFocus={false}
        className={styles.select}
        IconComponent={ExpandMore}
        MenuProps={{
          classes: {
            paper: menuStyles,
          },
        }}
        multiple={multiSelect}
        renderValue={(selected: any) => {
          return (
            <Box className={styles.selectedValueContainer}>
              {selected?.length === 0 && placeholder && (
                <Placeholder text={placeholder} />
              )}
              {selected.map((value: string) => {
                const item = items.find((item) => item.value === value);
                if (multiSelect) {
                  return (
                    <Chip
                      styles='select'
                      key={value}
                      label={item?.label}
                      disabled={disabled}
                      onDelete={(e) => handleDelete(item as ItemProps)}
                    />
                  );
                }
                return (
                  <Typography key={value} variant='body-2/semibold'>
                    {item?.label ?? ''}
                  </Typography>
                );
              })}
            </Box>
          );
        }}
      >
        {search && (
          <ListSubheader className={styles.searchContainer}>
            <TextField
              className={styles.searchTextField}
              fullWidth
              size='small'
              placeholder='Hint'
              data-cy='select-search-text'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon name='search-lens' />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
        )}
        {displayedOptions.map(({ value, label }) => {
          const isSelected = selected.includes(String(value));
          return (
            <MenuItem
              className={styles.menuItemContainer}
              value={value}
              key={value}
            >
              <Box
                width='100%'
                className={`${styles.item} ${
                  isSelected ? styles.selected : ''
                }`}
              >
                <Typography variant='body-2/regular'>{label}</Typography>
                {isSelected && <CheckSvg />}
              </Box>
            </MenuItem>
          );
        })}
      </MuiSelect>
      {helperText && (
        <FormHelperText className={styles.errorHelper} error>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default Select;
