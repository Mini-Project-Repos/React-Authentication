import React from "react";

/**
 * The file components/Form.js exports a function that renders any validation errors sent from the API,
 * via the <ErrorsDisplay> function component. It also renders the "Submit" and "Cancel" buttons of a form,
 * as well as handle their functionality, via the functions handleSubmit and handleCancel.
 * Props are passed to this component – from a parent component like UserSignUp – to provide it the data it needs.
 *
 *@param {props}
 *@returns error display and submit/cancel buttons of the form
 */

export default (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
