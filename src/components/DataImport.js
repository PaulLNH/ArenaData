import React from 'react';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

const styles = theme => ({
    modal: {
        display: 'flex',
        allignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 500,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: 2 * theme.spacing.unit,
    },
});

const DataImport = ({ classes, post, onSave, history }) => (
    <Form initialValues={post} onSubmit={onSave}>
      {({ handleSubmit }) => (
        <Modal
          className={classes.modal}
          onClose={() => history.goBack()}
          open
        >
          <Card className={classes.modalCard}>
            <form onSubmit={handleSubmit}>
              <CardContent className={classes.modalCardContent}>
                <Field name="csvump">
                  {({ input }) => <TextField label="CSV Dump" autoFocus {...input} />}
                </Field>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" type="submit">Import</Button>
                <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
              </CardActions>
            </form>
          </Card>
        </Modal>
      )}
    </Form>
  );

  export default compose(
      withRouter,
      withStyles(styles),
  )(DataImport);