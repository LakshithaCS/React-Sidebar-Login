import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Container, Grid } from "@mui/material";
import { Button } from "@mui/material";
import create from "zustand";

type SuccessDialogStore = {
  title: string;
  message: string;
  close: boolean;
};

const useSuccessDialogStore = create<SuccessDialogStore>((set) => ({
  title: "",
  message: "",
  close: false,
}));

export const openSuccessDialog = (title: string, message: string) => {
  useSuccessDialogStore.setState({
    title: title,
    message: message,
    close: true,
  });
};

export const closeSuccessDialog = () => {
  useSuccessDialogStore.setState({
    close: false,
  });
};

const SuccessDialog = () => {
  const { title, message, close } = useSuccessDialogStore();

  const handleClose = () => {
    useSuccessDialogStore.setState({
      close: false,
    });
  };

  return (
    <div>
      <Dialog
        open={close}
        onClose={handleClose}
        className="scf-modal"
        fullWidth={true}
        PaperProps={{
          style: { borderRadius: 15 }   }}
      >
        <IconButton
          color="success"
          className="scf-btn-modal-close"
          onClick={handleClose}
        >
          <CancelIcon />
        </IconButton>
        <Container>
          <Grid
            container
            style={{ marginTop: "40px", justifyContent: "center" }}
            direction="row"
          >
            <Grid item className="scf-modal-row">
              <i className="fas fa-circle-check scf-status-syb scf-status-syb--success"></i>
            </Grid>
          </Grid>
        </Container>
        <DialogTitle
          style={{ textAlign: "center" }}
          className="scf-page-title scf-page-title--success"
        >
          {title}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText className="scf-page-message">{message}</DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained" color="success" style={{ fontWeight: "bold" }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SuccessDialog;
