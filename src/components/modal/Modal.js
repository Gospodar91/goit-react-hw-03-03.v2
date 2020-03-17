import React from "react";

import Modal from "react-responsive-modal";
export default class MainModal extends React.Component {
  state = {
    open: false
  };

  onOpenModal = e => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>

        <Modal open={open} onClose={this.onCloseModal} center>
          <img src={this.props.url} alt="not" />
        </Modal>
      </div>
    );
  }
}
