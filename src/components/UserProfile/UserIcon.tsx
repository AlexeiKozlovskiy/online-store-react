import './UserIcon.scss';

export interface IUserIcon {
  handleClick?: React.MouseEventHandler;
}

export const UserIcon = ({ handleClick }: IUserIcon) => {
  return (
    <div className="user-icon" onClick={handleClick}>
      RR
    </div>
  );
};
