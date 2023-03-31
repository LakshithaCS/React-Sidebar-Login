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

type ConfirmDialogStore = {
  title: string;
  message: string;
  data: any;
  onSubmit?: (p: any) => void;
  confirmBtnDisable?: boolean
  close: boolean;
};

const useConfirmDialogStore = create<ConfirmDialogStore>((set) => ({
  title: "",
  message: "",
  data: undefined,
  onSubmit: undefined,
  confirmBtnDisable: false,
  close: false,
}));

export const openConfirmDialog = (
  title: string,
  message: string,
  data: any,
  onSubmit?: (p: any) => void,
) => {
  useConfirmDialogStore.setState({
    title: title,
    message: message,
    data: data,
    onSubmit: onSubmit,
    confirmBtnDisable: false,
    close: true,
  });
};

export const disableBtnConfirmDialog = (val: boolean) => {
  useConfirmDialogStore.setState({
    confirmBtnDisable: val,
  });
};

export const closeConfirmDialog = () => {
  useConfirmDialogStore.setState({
    close: false,
  });
};

const ConfirmDialog: React.FC = () => {
  const { title, message, data, onSubmit, confirmBtnDisable, close } = useConfirmDialogStore();

  const handleClose = () => {
    useConfirmDialogStore.setState({
      close: false,
    });
  };

  return (
    <div>
      <Dialog
        open={close}
        onClose={handleClose}
        fullWidth={true}
        className="scf-modal"
        PaperProps={{
          style: { borderRadius: 15 }   }}
      >
        <IconButton
          color="primary"
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
              <i className="fas fa-circle-info scf-status-syb scf-status-syb__stop-icon"></i>
            </Grid>
          </Grid>
        </Container>
        <DialogTitle style={{ textAlign: "center" }} className="scf-page-title">
          {title}
        </DialogTitle>
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText className="scf-page-message">{message}</DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              if (onSubmit) {
                onSubmit(data);
              }
            }}
            variant="contained"
            style={{ fontWeight: "bold" }}
            color='primary'
            disabled={confirmBtnDisable}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
