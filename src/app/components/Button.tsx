interface Props {
  children: string;
  color: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return (
    <>
      <button
        onClick={props.onClick}
        type="button"
        className={"btn btn-" + props.color}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
