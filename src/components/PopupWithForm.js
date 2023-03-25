export default function PopupWithForm(props) {
  return props.isOpen ? (
    <div className={`popup popup_opened popup_type_${props.name}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button onClick={props.handleClick}
          type="button"
          className={`popup__button-closed popup__button-closed_type_${props.name}`}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          noValidate
        >
          {props.children}
          <button
            type="submit"
            className={`popup__submit popup__submit_type_${props.name}`}
          >
            {props.submitButtonText}
          </button>
        </form>
      </div>
    </div>
  ) : null;
}