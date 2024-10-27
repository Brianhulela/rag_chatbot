import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { updateChat } from '../firebase/Database';

export default function TitleUpdateDialog({chat}) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(chat.title);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateChat(chat.id, { title: title });
    handleClose();
  };

  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <EditRoundedIcon color='warning' fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update Title</ListItemText>
        </MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Update Title</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Discard</Button>
          <Button variant='outlined' color='warning' onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
