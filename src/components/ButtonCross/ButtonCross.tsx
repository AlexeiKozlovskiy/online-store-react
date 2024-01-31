import './ButtonCross.scss';

interface IButtonCross {
  onClickCross: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  dataId?: string;
  adittionClassName?: string;
}

export function ButtonCross({ onClickCross, dataId, adittionClassName }: IButtonCross) {
  return (
    <button
      className={`common-cross-btn ${adittionClassName}`}
      onClick={onClickCross}
      data-id={dataId}
      data-testid="crossBtn"
    ></button>
  );
}
