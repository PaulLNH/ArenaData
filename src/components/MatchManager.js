import React, { Component, Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import DataImport from '../components/DataImport';

const styles = theme => ({
    matches: {
        marginTop: 2 * theme.spacing.unit,
    },
    fab: {
        position: 'absolute',
        bottom: 3 * theme.spacing.unit,
        right: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
            bottom: 2 * theme.spacing.unit,
            right: 2 * theme.spacing.unit,
        },
    },
});

const API = process.env.REACT_APP_API || 'http//localhost:3001';

class MatchManager extends Component {
    state = {
        lodaing: true,
        matches: [],
    };

    componentDidMount() {
        this.getMatches();
    }

    async fetch(method, endpoint, body) {
        try {
          const response = await fetch(`${API}${endpoint}`, {
            method,
            body: body && JSON.stringify(body),
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
            },
          });
          return await response.json();
        } catch (error) {
          console.error(error);
        }
      }

      async getMatches() {
          this.setState({ loading: false, matches: await this.fetch('get', '/matches') });
      }

      saveMatch = async (match) => {
          if (match.id) {
              await this.fetch('put', `/matches/${match.id}`, match);
          } else {
              await this.fetch('match', '/matches', match);
          }

          this.props.history.goBack();
          this.getMatches();
      }

      async deleteMatch(match) {
          if (window.confirm(`Are you sure you want to delete "${match.teamComposition} vs ${match.enemyComposition} played on ${match.timestamp}"?`)) {
              await this.fetch('delete', `/matches/${match.id}`);
              this.getMatches();
          }
      }

      renderMatchEditor = ({ match: { params: { id } } }) => {
          if (this.state.loading) return null;
          const match = find(this.state.matches, { id: Number(id) });

          if (!match && id !== 'new') return <Redirect to="/matches" />;

          return <DataImport match={match} onSave={this.saveMatch} />;
      };

      render() {
        const { classes } = this.props;
    
        return (
          <Fragment>
            <Typography variant="display1">Match Manager</Typography>
            {this.state.matches.length > 0 ? (
              <Paper elevation={1} className={classes.matches}>
                <List>
                  {orderBy(this.state.matches, ['updatedAt', 'timestamp'], ['desc', 'asc']).map(match => (
                    <ListItem key={match.id} button component={Link} to={`/matches/${match.id}`}>
                      <ListItemText
                        primary={match.timestamp}
                        secondary={match.updatedAt && `Updated ${moment(match.updatedAt).fromNow()}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => this.deleteMatch(match)} color="inherit">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : (
              !this.state.loading && <Typography variant="subheading">No matches to display</Typography>
            )}
            <Button
              variant="fab"
              color="secondary"
              aria-label="add"
              className={classes.fab}
              component={Link}
              to="/matches/new"
            >
              <AddIcon />
            </Button>
            <Route exact path="/matches/:id" render={this.renderDataImport} />
          </Fragment>
        );
      }
    }
    
    export default compose(
      withRouter,
      withStyles(styles),
    )(MatchManager);