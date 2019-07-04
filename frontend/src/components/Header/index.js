import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  Button
} from "@material-ui/core";

// import { Home, User } from "@material-ui/icons";
import Tweet from "../Tweet";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar,
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: 30,
    right: 30,
    margin: "0 auto"
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              ReTweet
            </Typography>
            <Button color="inherit">Usuário: Lucas Chaves</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button key={1}>
              <ListItemIcon>
                <Icon>home</Icon>
              </ListItemIcon>
              <ListItemText primary={"Página Inicial"} />
            </ListItem>
            <ListItem button key={2}>
              <ListItemIcon>
                <Icon>supervised_user_circle</Icon>
              </ListItemIcon>
              <ListItemText primary={"Usuários"} />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Tweet />
        </main>
      </div>
    </>
  );
}
