import React, { Component } from "react";
import { TextField, Button, Icon, Paper, Fab } from "@material-ui/core";
import api from "../../services/api";

import "./style.css";
export default class New extends Component {
  state = {
    post_descricao: "",
    usuarioid: "1"
  };

  handleChange = e => {
    this.setState({ post_descricao: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.post_descricao !== "") {
      await api.post("/post", this.state);
      this.setState({ post_descricao: "" });
    }
  };
  render() {
    return (
      <form id="new-tweet" onSubmit={this.handleSubmit}>
        <Paper>
          <span />
          <TextField
            autoFocus
            multiline
            id="post_descricao"
            label="O que você está pensando?"
            type="text"
            // fullWidth
            inputProps={{ maxLength: 100 }}
            onChange={this.handleChange}
            value={this.state.post_descricao}
          />

          <Fab color="primary" type="submit">
            <Icon>send</Icon>
          </Fab>
        </Paper>
      </form>
    );
  }
}
