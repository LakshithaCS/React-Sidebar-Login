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

type PublicCongratulationsDialogStore = {
  title: string;
  message: string;
  url: string;
  close: boolean;
};

const usePublicCongratulationsDialogStore =
  create<PublicCongratulationsDialogStore>((set) => ({
    title: "",
    message: "",
    url: "",
    close: false,
  }));

export const openPublicCongratulationsDialog = (
  title: string,
  message: string,
  url: string
) => {
  usePublicCongratulationsDialogStore.setState({
    title: title,
    message: message,
    url: url,
    close: true,
  });
};

export const closePublicCongratulationsDialog = () => {
  usePublicCongratulationsDialogStore.setState({
    close: false,
  });
};

const PublicCongratulationsDialog = () => {
  const { title, message, url, close } = usePublicCongratulationsDialogStore();

  const handleClose = () => {
    usePublicCongratulationsDialogStore.setState({
      close: false,
    });
    window.location.reload();
  };

  return (
    <div>
      <Dialog
        open={close}
        onClose={handleClose}
        className="scf-modal"
        fullWidth={true}
        PaperProps={{
          style: { borderRadius: 15 },
        }}
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
        <DialogContent style={{ textAlign: "center", overflowX: 'hidden' }}>
          <DialogContentText className="scf-page-message">
            {message}
          </DialogContentText>
          <div className="row my-3">
            <div className="col-12">
              <img
                className="domain-icon"
                src={require("../../../assets/images/browser-link-bar.png")}
                alt=""
                width='100%'
              ></img>
              <small
                className="domain-link"
                style={{
                  position: "absolute",
                  color: "aliceblue",
                  left: "150px",
                  marginTop: "2px",
                }}
              >
                {(((url).substring(0, 50)) + (url?.length > 50 ? '...' : ''))}
              </small>
            </div>
            <div className="col-12 float-right mt-2">
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => {
                  window.open(url, "_blank");
                  window.location.reload();
                }}
              >
                View Site
              </Button>
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleClose}
            variant="contained"
            color="success"
            style={{ fontWeight: "bold" }}
          >
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PublicCongratulationsDialog;
