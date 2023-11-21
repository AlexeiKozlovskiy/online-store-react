import './ButtonCross.scss';

interface ButtonCross {
  onClickCross: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  dataId?: string;
}

export function ButtonCross({ onClickCross, dataId }: ButtonCross) {
  return <div className="close-btn" onClick={onClickCross} data-id={dataId}></div>;
}
