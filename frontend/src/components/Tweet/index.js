import React, { Component } from "react";
import api from "../../services/api";
import io from "socket.io-client";
import "./styles.css";
import New from "../New";

import {
  IconButton,
  Icon,
  Paper,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";

export default class Tweet extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("/post");
    this.setState({ feed: response.data });
  }

  handleLike = id => {
    api.put("/post/like/" + id);
  };

  registerToSocket = () => {
    const socket = io("http://localhost:4000");
    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", newLike => {
      this.setState({
        feed: this.state.feed.map(post =>
          post.id === newLike.id ? newLike : post
        )
      });
    });
  };

  render() {
    return (
      <>
        <New />
        <section id="post-tweet">
          {this.state.feed.map(post => (
            <Paper>
              <article key={post.id}>
                <header>
                  <div className="usuInfo">
                    <List className="">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Icon>turned_in_not</Icon>
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <React.Fragment>
                              {post.Usuario.usu_nome}
                              <Typography component="span"> - </Typography>

                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                @
                              </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.Usuario.usu_login}
                              </Typography>
                              <Typography component="span"> - </Typography>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {post.data}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                  </div>
                </header>

                <p>{post.post_descricao}</p>

                <footer>
                  <IconButton color="default">
                    <Icon>turned_in_not</Icon>
                  </IconButton>
                  <span className="splike">0</span>

                  <IconButton color="default">
                    <Icon>cached</Icon>
                  </IconButton>
                  <span className="splike" />

                  <IconButton
                    color="default"
                    onClick={() => {
                      this.handleLike(post.id);
                    }}
                  >
                    <Icon>favorite_border</Icon>
                  </IconButton>
                  <span className="splike">{post.post_like}</span>
                </footer>
              </article>
            </Paper>
          ))}
        </section>
      </>
    );
  }
}
